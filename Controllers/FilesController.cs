using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using TransparentAccounting.Models.Structs;

namespace TransparentAccounting.Controllers
{
    public class FilesController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private const string FILE_DIRECTORY = "uploads";
        private readonly string _localPath;
        
        public FilesController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            _localPath = _hostingEnvironment.ContentRootPath;
        }
        [HttpPost, DisableRequestSizeLimit]
        public ActionResult Upload()
        {
            if (Request.Form.Files.Count == 0)
                return Content("No files uploaded.");

            var files = SaveFiles(Request.Form.Files, FILE_DIRECTORY);

            return Json(files);
        }

        //Item1 = original name, Item2 = saved name
        private IEnumerable<UploadedFile> SaveFiles(IFormFileCollection files, string path)
        {
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
            
            return files.Select(file => SaveFile(file, path)).ToArray();
        }
        private UploadedFile SaveFile(IFormFile file, string path)
        {
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
            
            string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            string newFileName = Guid.NewGuid().ToString();
            //Generate new name, but keep the extension (if there is one)
            string[] nameParts = fileName.Split('.');
            if (nameParts.Length > 1)
                newFileName = $"{newFileName}.{nameParts[1]}";
            
            string relativePath = Path.Combine(path, newFileName);
            string absolutePath = Path.Combine(_localPath, relativePath);
            
            using (var stream = new FileStream(absolutePath, FileMode.Create))
                file.CopyTo(stream);

            return new UploadedFile
            {
                Name = fileName,
                Path = relativePath
            };
        }
        
    }
}