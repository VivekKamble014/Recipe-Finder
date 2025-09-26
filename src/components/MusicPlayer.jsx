import { useState, useRef, useEffect } from 'react'

const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [selectedLanguage, setSelectedLanguage] = useState('hindi')
  const audioRef = useRef(null)

  // Sample music data - you can replace with actual music files or API
  const musicData = {
    hindi: [
      {
        id: 1,
        title: "Tum Hi Ho",
        artist: "Arijit Singh",
        album: "Aashiqui 2",
        duration: "4:22",
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        cover: "https://via.placeholder.com/300x300?text=Tum+Hi+Ho"
      },
      {
        id: 2,
        title: "Channa Mereya",
        artist: "Arijit Singh",
        album: "Ae Dil Hai Mushkil",
        duration: "4:49",
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        cover: "https://via.placeholder.com/300x300?text=Channa+Mereya"
      },
      {
        id: 3,
        title: "Kesariya",
        artist: "Arijit Singh",
        album: "Brahmastra",
        duration: "4:28",
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        cover: "https://via.placeholder.com/300x300?text=Kesariya"
      },
      {
        id: 4,
        title: "Raataan Lambiyan",
        artist: "Jubin Nautiyal",
        album: "Shershaah",
        duration: "3:50",
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        cover: "https://via.placeholder.com/300x300?text=Raataan+Lambiyan"
      }
    ],
    marathi: [
      {
        id: 5,
        title: "Apsara Aali",
        artist: "Ajay-Atul",
        album: "Sairat",
        duration: "4:15",
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        cover: "https://via.placeholder.com/300x300?text=Apsara+Aali"
      },
      {
        id: 6,
        title: "Zingaat",
        artist: "Ajay-Atul",
        album: "Sairat",
        duration: "3:45",
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        cover: "https://via.placeholder.com/300x300?text=Zingaat"
      },
      {
        id: 7,
        title: "Yad Lagla",
        artist: "Ajay-Atul",
        album: "Sairat",
        duration: "4:30",
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        cover: "https://via.placeholder.com/300x300?text=Yad+Lagla"
      },
      {
        id: 8,
        title: "Malhari",
        artist: "Vishal Dadlani",
        album: "Bajirao Mastani",
        duration: "3:55",
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        cover: "https://via.placeholder.com/300x300?text=Malhari"
      }
    ],
    kannada: [
      {
        id: 9,
        title: "Kannada Naadina",
        artist: "Raghu Dixit",
        album: "Kannada Folk",
        duration: "4:10",
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        cover: "https://via.placeholder.com/300x300?text=Kannada+Naadina"
      },
      {
        id: 10,
        title: "Huttidare Kannada",
        artist: "C. Ashwath",
        album: "Kannada Classics",
        duration: "3:40",
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        cover: "https://via.placeholder.com/300x300?text=Huttidare+Kannada"
      },
      {
        id: 11,
        title: "Jogada Siri Belakinalli",
        artist: "P. B. Sreenivos",
        album: "Kannada Melodies",
        duration: "4:20",
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        cover: "https://via.placeholder.com/300x300?text=Jogada+Siri"
      },
      {
        id: 12,
        title: "Ee Bhoomi Bannada Buguri",
        artist: "C. Ashwath",
        album: "Kannada Folk",
        duration: "3:35",
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        cover: "https://via.placeholder.com/300x300?text=Ee+Bhoomi"
      }
    ]
  }

  const currentSongs = musicData[selectedLanguage] || []

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const playSong = (song) => {
    setCurrentSong(song)
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.src = song.url
      audioRef.current.play()
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const getLanguageFlag = (lang) => {
    switch (lang) {
      case 'hindi': return '🇮🇳'
      case 'marathi': return '🟠'
      case 'kannada': return '🟡'
      default: return '🎵'
    }
  }

  return (
    <div className="music-player-container">
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <div className="fade-in">
              <h1 className="text-center mb-4 display-4 fw-bold">
                <span className="text-gradient">🎵 Music Player</span>
              </h1>
              <p className="text-center mb-5 text-muted fs-5">
                Enjoy your favorite songs while cooking delicious recipes
              </p>
            </div>

            {/* Language Selection */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Select Language</h5>
                    <div className="btn-group w-100" role="group">
                      {Object.keys(musicData).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          className={`btn ${selectedLanguage === lang ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setSelectedLanguage(lang)}
                        >
                          {getLanguageFlag(lang)} {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Song Player */}
            {currentSong && (
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-3">
                          <img
                            src={currentSong.cover}
                            alt={currentSong.title}
                            className="img-fluid rounded"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <h5 className="mb-1">{currentSong.title}</h5>
                          <p className="text-muted mb-1">{currentSong.artist}</p>
                          <small className="text-muted">{currentSong.album}</small>
                        </div>
                        <div className="col-md-3 text-end">
                          <div className="btn-group">
                            <button
                              className="btn btn-primary btn-lg"
                              onClick={togglePlayPause}
                            >
                              {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="d-flex justify-content-between mb-1">
                          <small>{formatTime(currentTime)}</small>
                          <small>{formatTime(duration)}</small>
                        </div>
                        <input
                          type="range"
                          className="form-range"
                          min="0"
                          max="100"
                          value={duration ? (currentTime / duration) * 100 : 0}
                          onChange={handleSeek}
                        />
                      </div>

                      {/* Volume Control */}
                      <div className="mt-3">
                        <div className="d-flex align-items-center">
                          <i className="fas fa-volume-down me-2"></i>
                          <input
                            type="range"
                            className="form-range flex-grow-1"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                          />
                          <i className="fas fa-volume-up ms-2"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Songs List */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      {getLanguageFlag(selectedLanguage)} {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} Songs
                    </h5>
                    <div className="row">
                      {currentSongs.map((song) => (
                        <div key={song.id} className="col-md-6 col-lg-4 mb-3">
                          <div className="card h-100 song-card">
                            <img
                              src={song.cover}
                              className="card-img-top"
                              alt={song.title}
                              style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body d-flex flex-column">
                              <h6 className="card-title">{song.title}</h6>
                              <p className="card-text text-muted small">{song.artist}</p>
                              <p className="card-text text-muted small">{song.album}</p>
                              <div className="mt-auto">
                                <button
                                  className="btn btn-primary btn-sm w-100"
                                  onClick={() => playSong(song)}
                                >
                                  <i className="fas fa-play me-1"></i> Play
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  )
}

export default MusicPlayer
