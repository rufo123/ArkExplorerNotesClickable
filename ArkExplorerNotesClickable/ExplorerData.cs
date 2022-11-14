using System.Globalization;

namespace ArkExplorerNotesClickable
{
    public class ExplorerData
    {
        private Dictionary<int, ExplorerNoteData>? aArrayExplorerNotes;

        public ExplorerData() {
            LoadData();
        }

        public Dictionary<int, ExplorerNoteData>? GetData() {
                return aArrayExplorerNotes;
        }

        public void LoadData() {

            string[] lines = System.IO.File.ReadAllLines(@"wwwroot/assets/explorer_notes/island/The_Island_Explorer_Notes.txt");

            aArrayExplorerNotes = new Dictionary<int, ExplorerNoteData>(lines.Length);
            int test = 0;

            foreach (string itemExplorerNote in lines)
            {
                test++;
                var tmpArrayExplorerNotesItems = itemExplorerNote.Split('\t');

                for (int i = 0; i < tmpArrayExplorerNotesItems.Length - 2; i++)
                {
                    tmpArrayExplorerNotesItems[i] = tmpArrayExplorerNotesItems[i].Replace(" ", string.Empty);
                }

                float tmpLat = -1;
                float tmpLon = -1;

                string tmpType = tmpArrayExplorerNotesItems[0];
                string tmpTopic = tmpArrayExplorerNotesItems[1];
                string tmpAuthor = tmpArrayExplorerNotesItems[2];
                bool tmpLatSucc = float.TryParse(tmpArrayExplorerNotesItems[3], NumberStyles.Any, CultureInfo.InvariantCulture, out tmpLat);
                bool tmpLonSucc = float.TryParse(tmpArrayExplorerNotesItems[4], NumberStyles.Any, CultureInfo.InvariantCulture, out tmpLon);
                string tmpLocation = tmpArrayExplorerNotesItems[5];
                int tmpID = int.Parse(tmpArrayExplorerNotesItems[6], CultureInfo.InvariantCulture);

                aArrayExplorerNotes.Add(tmpID, new ExplorerNoteData(tmpType, tmpTopic, tmpAuthor, new System.Numerics.Vector2(tmpLat, tmpLon), tmpLocation, tmpID));

            }
        }



    }
}
