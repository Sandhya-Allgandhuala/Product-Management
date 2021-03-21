using CRUDReact.Models;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web.Mvc;


namespace CRUDReact.Controllers
{
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        //fetch data from database
        [HttpGet]
        public JsonResult GetProductData()
        {
            using (TransactionEntities db = new TransactionEntities())
            {
                var Product = db.Products.ToList();
                var Products = Product.Select(x => new { x.Id, x.Name, x.Price });
                return Json(Products, JsonRequestBehavior.AllowGet);

            }
        }

        //Add record to database
        [HttpPost]
        public JsonResult SaveProductData(Product product)
        {
            try
            {
                using (TransactionEntities db = new TransactionEntities())
                {
                    db.Products.Add(product);
                    db.SaveChanges();
                    return Json(new { success = true, data = product });
                }
            }
            catch
            {
                return Json(new { success = false, message = "Invalid" });
            }

        }

        //Update Record in Database.
        [HttpPut]
        public JsonResult UpdateProductData(Product product)
        {
            using (TransactionEntities db = new TransactionEntities())
            {
                if (ModelState.IsValid)
                {
                    try
                    {
                        db.Entry(product).State = EntityState.Modified;
                        db.SaveChanges();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        var result = db.Products.SingleOrDefault(a => a.Id == product.Id);
                        if (result == null)
                        {
                            return Json(new { success = false, message = "Cannot find product to update" }, JsonRequestBehavior.AllowGet);
                        }
                        else
                        {
                            throw;
                        }
                    }

                    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
                }
            }

            return Json(new { success = false, message = "Invalid product given" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteProductData(int id)
        {
            try
            {
                using (TransactionEntities db = new TransactionEntities())
                {
                    Product product = db.Products.Find(id);
                    db.Products.Remove(product);
                    db.SaveChanges();
                    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {
                return Json(new { success = false, message = "Cannot delete Product" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
