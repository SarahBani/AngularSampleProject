using Core.DomainModel.Settings;
using Core.DomainServices;
using Microsoft.Extensions.Configuration;

namespace WebApplication.Common
{
    public static class MyWebRequest
    {

        #region Properties

        public static ErrorHandling ErrorHandling { get; private set; }

        public static WebSiteEmail WebSiteEmail { get; private set; }

        #endregion /Properties

        #region Methods

        public static void Configure(IConfiguration config)
        {
            ErrorHandling = Utility.GetApplicationSettingSecion<ErrorHandling>(config);
            WebSiteEmail = Utility.GetApplicationSettingSecion<WebSiteEmail>(config);
        }

        #endregion /Methods

    }
}
