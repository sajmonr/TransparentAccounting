using Microsoft.AspNetCore.Mvc;
using TransparentAccounting.Sql;

namespace TransparentAccounting.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BaseController : Controller
    {
        public ApplicationDomainContext GetDbContext() => HttpContext.RequestServices.GetService(typeof(ApplicationDomainContext)) as ApplicationDomainContext;
        }
}