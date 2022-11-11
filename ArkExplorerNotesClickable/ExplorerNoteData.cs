using System.Numerics;

namespace ArkExplorerNotesClickable
{
    public class ExplorerNoteData
    {

        private string aType;
        private string aTopic;
        private string aAuthor;
        private Vector2 aCoordinates;
        private string aLocation;
        private int aId;
        private string aCoordinatesString;

        public ExplorerNoteData(string parType, string parTopic, string parAuthor, Vector2 parCoordinates, string parLocation, int parId)
        {
            this.aType = parType;
            this.aTopic = parTopic;
            this.aAuthor = parAuthor;
            this.aCoordinates = parCoordinates;
            this.aLocation = parLocation;
            this.aId = parId;
            this.aCoordinatesString = parCoordinates.X + "," + parCoordinates.Y;
        }

        public Vector2 Coordinates { get => aCoordinates; }
        public string Type { get => aType; }
        public string Topic { get => aTopic; }
        public string Author { get => aAuthor; }
        public string Location { get => aLocation; }
        public int Id { get => aId; }
        public string CoordinatesString { get => aCoordinatesString; }
    }
}
