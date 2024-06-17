using gg.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace gg.Controllers

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
            return View();
        }
        [HttpPost]

        public string Index(string First_name, string Last_name, string Middle_name, string school_middle, string school_new, string quantum, bool klass, bool Fruit)
        {
            return $"First_name: {First_name}\n" +
                $"Last_name: {Last_name}\n" +
                $"Middle_name: {Middle_name}\n" +
                $"school_new: {school_new}\n" +
                $"quantum: {quantum}\n" +
                $"10_class: {klass}\n" +
                $"da_net: {Fruit}\n";
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
    