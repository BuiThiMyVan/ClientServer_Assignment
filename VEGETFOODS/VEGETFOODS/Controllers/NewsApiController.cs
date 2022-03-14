using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VEGETFOODS.Models;
using static VEGETFOODS.SP_NEWS_SEARCH_Result;
using static VEGETFOODS.SP_NEWS_SEARCHACTIVE_Result;
using static VEGETFOODS.SP_NEWS_SEARCHACTIVE_Result.SP_NEWS_SEARCHACTIVE_ResultDTO;

namespace VEGETFOODS.Controllers
{
    public class NewsApiController : ApiController
    {
        VEGETFOODSEntities context = new VEGETFOODSEntities();

        [HttpPost]
        public IHttpActionResult GetListNews(Pagination objPage)
        {
            var totalItems = new ObjectParameter("totalItems", typeof(int));
            var startIndex = (objPage.pageIndex - 1) * objPage.pageSize;
            var count = objPage.pageSize;
            var txtSearch = objPage.txtSearch == null ? "" : objPage.txtSearch.Trim();
            var categories = context.SP_NEWS_SEARCH(txtSearch, startIndex, count, totalItems).ToList();
            var totalCategories = Convert.ToInt32(totalItems.Value);
            var pageView = "";

            if (totalCategories < (objPage.pageIndex * objPage.pageSize))
            {
                pageView = (startIndex + 1) + "-" + totalCategories + " trong tổng số " + totalCategories;
            }
            else
            {
                pageView = (startIndex + 1) + "-" + (objPage.pageIndex * objPage.pageSize) + " trong tổng số " + totalCategories;
            }
            int totalPage = 0;
            totalPage = (int)Math.Ceiling((double)totalCategories / objPage.pageSize);

            JsonNEWS jsonreturn = new JsonNEWS
            {
                list = categories.Select(t => t.CopyObjectForSP_NEWS_SEARCH_ResultApi()).ToArray(),
                totalPage = totalPage,
                pageView = pageView
            };

            return Json(new { data = jsonreturn });

        }

        [System.Web.Http.AcceptVerbs("GET")]
        public IHttpActionResult GetNewsById(int newsId)
        {
            var news = context.SP_NEWS_GETBYID(newsId).FirstOrDefault();

            return Json(new { data = news });
        }

        [System.Web.Http.AcceptVerbs("POST")]
        public IHttpActionResult UpdateNews(NEWS news)
        {
            try
            {
                context.SP_NEWS_UPDATE(news.NewsID, news.NewsCateID, news.NewsTitle, news.NewsImages, news.NewsSummary, news.NewsBody, news.CreateBy, news.Hashtags, news.IsActive);
                return Json(new { message = 200 });
            }
            catch
            {
                return Json(new { message = 400 });
            }
        }

        [HttpPost]
        public IHttpActionResult CreateNews(NEWS news)
        {
            try
            {
                context.SP_NEWS_CREATE(news.NewsCateID, news.NewsTitle, news.NewsImages, news.NewsSummary, news.NewsBody, news.CreateBy, news.Hashtags);
                return Json(new { message = 200 });
            }
            catch (Exception e)
            {
                return Json(new { message = 400 });
            }
        }

        [HttpPost]
        public IHttpActionResult DeleteNews(int newsId)
        {
            try
            {
                context.SP_NEWS_DELETE(newsId);
                return Json(new { message = 200 });
            }
            catch
            {
                return Json(new { message = 400 });
            }
        }

        [HttpPost]
        public IHttpActionResult GetListNewsActive(Pagination objPage)
        {
            var totalItems = new ObjectParameter("totalItems", typeof(int));
            var startIndex = (objPage.pageIndex - 1) * objPage.pageSize + 1;
            var count = objPage.pageSize;
            var txtSearch = objPage.txtSearch == null ? "" : objPage.txtSearch.Trim();
            var categories = context.SP_NEWS_SEARCHACTIVE(txtSearch, startIndex, count, totalItems).ToList();
            var totalCategories = Convert.ToInt32(totalItems.Value);
            var pageView = "";

            if (totalCategories < (objPage.pageIndex * objPage.pageSize))
            {
                pageView = (startIndex + 1) + "-" + totalCategories + " trong tổng số " + totalCategories;
            }
            else
            {
                pageView = (startIndex + 1) + "-" + (objPage.pageIndex * objPage.pageSize) + " trong tổng số " + totalCategories;
            }
            int totalPage = 0;
            totalPage = (int)Math.Ceiling((double)totalCategories / objPage.pageSize);

            JsonNEWSACTIVE jsonreturn = new JsonNEWSACTIVE
            {
                list = categories.Select(t => t.CopyObjectForSP_NEWS_SEARCHACTIVE_ResultApi()).ToArray(),
                totalPage = totalPage,
                pageView = pageView
            };

            return Json(new { data = jsonreturn });

        }

        [System.Web.Http.AcceptVerbs("GET")]
        public IHttpActionResult GetRecentNews()
        {
            var news = context.SP_NEWS_GETTOP3().ToList();

            return Json(new { data = news });
        }
    }
}
