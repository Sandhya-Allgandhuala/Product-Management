using CRUDReact.Models;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web.Mvc;

namespace CRUDReact.Controllers
{
    public class CustomerController : Controller
    {

        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        //fetch data from database
        [HttpGet]
        public JsonResult GetCustomerData()
        {
            using (TransactionModelEntities db = new TransactionModelEntities())
            {
                var st0 = db.Customers.ToList();
                var data = st0.Select(x => new { x.ID, x.Name,x.Address });
                return Json(data, JsonRequestBehavior.AllowGet);

            }
        }

        //Add record to database
         [HttpPost]
         public JsonResult SaveCustomerData(Customer customer)
         {
              try
             {
                 using (TransactionModelEntities db = new TransactionModelEntities())
                  {
                      db.Customers.Add(customer);
                      db.SaveChanges();
                      return Json(new { success = true, data = customer });
                  }
              }
              catch          
              {
                  return Json(new { success = false, message = "Invalid customer given" });
              }

         }
        //Update Record in Database.
        [HttpPut]
        public JsonResult UpdateCustomerData(Customer customer)
        {
            using (TransactionModelEntities db = new TransactionModelEntities())
            {
                if (ModelState.IsValid)
                {
                    try
                    {
                        db.Entry(customer).State = EntityState.Modified;
                        db.SaveChanges();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        var result = db.Customers.SingleOrDefault(a => a.ID == customer.ID);
                        if (result == null)
                        {
                            return Json(new { success = false, message = "Cannot find customer to update" }, JsonRequestBehavior.AllowGet);
                        }
                        else
                        {
                            throw;
                        }
                    }

                    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
                }
            }

            return Json(new { success = false, message = "Invalid customer given" }, JsonRequestBehavior.AllowGet);
        }

        //Delete record from database
        public JsonResult DeleteCustomerData(int id)
        {
            try
            {
                using (TransactionModelEntities db = new TransactionModelEntities())
                {
                    Customer customer = db.Customers.Find(id);
                    db.Customers.Remove(customer);
                    db.SaveChanges();
                    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {
                return Json(new { success = false, message = "Cannot delete customer" }, JsonRequestBehavior.AllowGet);
            }
        }


    }

}
