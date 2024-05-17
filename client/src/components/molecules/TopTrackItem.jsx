const TopTrackItem = ({ track, index }) => {
  return (
    <article key={track.id}>
      <h3 className="mb-2 text-lg font-bold">
        #{index + 1} {track.name} - {track.artists.map((artist) => artist.name).join(', ')}
      </h3>
      <iframe
        title={`Spotify Player ${track.id}`}
        src={`https://open.spotify.com/embed/track/${track.id}`}
        className="w-full h-96 sm:h-full"
        loading="lazy"
      />
    </article>
  );
};

export default TopTrackItem;
