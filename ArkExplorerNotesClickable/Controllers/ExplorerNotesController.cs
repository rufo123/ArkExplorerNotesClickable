using Microsoft.AspNetCore.Mvc;

namespace ArkExplorerNotesClickable.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExplorerNotesController : ControllerBase
    {

        ExplorerData aExplorerData;

        public ExplorerNotesController()
        {
            aExplorerData = new ExplorerData();
            aExplorerData.LoadData();
        }

        [HttpGet]
        public IEnumerable<ExplorerNoteData> Get()
        {
            var tmpExplorerNotesData = aExplorerData.GetData();

            if (tmpExplorerNotesData is not null)
            {

                return tmpExplorerNotesData.Values.AsEnumerable().ToArray();

            }

            return null;
        }
    }
}
