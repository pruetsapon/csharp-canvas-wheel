using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using random_item.Models;
using random_item.Helpers;

namespace random_item.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            List<Item> items = new List<Item>();
            items.Add(new Item() { path = "images/1.png", rate = 15});
            items.Add(new Item() { path = "images/2.png", rate = 20});
            items.Add(new Item() { path = "images/3.png", rate = 80});
            items.Add(new Item() { path = "images/4.png", rate = 90});
            items.Add(new Item() { path = "images/5.png", rate = 55});
            items.Add(new Item() { path = "images/6.png", rate = 85});
            items.Add(new Item() { path = "images/7.png", rate = 70});
            items.Add(new Item() { path = "images/8.png", rate = 88});
            items.Add(new Item() { path = "images/9.png", rate = 99});
            items.Add(new Item() { path = "images/10.png", rate = 35});
            return View(items.Select(i => i.path));
        }

        public IActionResult Random()
        {
            List<Item> items = new List<Item>();
            items.Add(new Item() { name = "1", rate = 15});
            items.Add(new Item() { name = "2", rate = 20});
            items.Add(new Item() { name = "3", rate = 80});
            items.Add(new Item() { name = "4", rate = 90});
            items.Add(new Item() { name = "5", rate = 55});
            items.Add(new Item() { name = "6", rate = 85});
            items.Add(new Item() { name = "7", rate = 70});
            items.Add(new Item() { name = "8", rate = 88});
            items.Add(new Item() { name = "9", rate = 99});
            items.Add(new Item() { name = "10", rate = 35});

            Item selected = RandomItem.SelectItem(items);

            return Ok(selected);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
