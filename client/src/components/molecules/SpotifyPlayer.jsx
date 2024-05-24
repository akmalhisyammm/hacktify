const SpotifyPlayer = ({ trackId }) => {
  return (
    <article className="-mb-6 sm:-mb-12">
      <iframe
        title="Spotify Player"
        src={`https://open.spotify.com/embed/track/${trackId}`}
        className="w-full h-96 sm:h-72"
        loading="lazy"
      />
    </article>
  );
};

export default SpotifyPlayer;
