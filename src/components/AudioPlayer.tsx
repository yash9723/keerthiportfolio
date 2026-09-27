import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX, X, Disc } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const trackName = 'Ambient Chords (Web Synth)';

  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<(AudioNode | OscillatorNode)[]>([]);

  const chords = [
    [130.81, 164.81, 196, 246.94], // Cmaj7
    [110, 130.81, 164.81, 196],     // Am7
    [87.31, 130.81, 174.61, 220],   // Fmaj7
    [98, 146.83, 196, 246.94],      // G7
  ];

  const playChord = (chord: number[]) => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;

    // Stop and clear previous nodes
    activeNodesRef.current.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as OscillatorNode).stop === 'function') {
          (node as OscillatorNode).stop();
        }
      } catch {
        // Node already stopped
      }
    });
    activeNodesRef.current = [];

    const chordGain = ctx.createGain();
    chordGain.gain.setValueAtTime(0, ctx.currentTime);
    chordGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.8);
    chordGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 5.8);
    chordGain.connect(masterGainRef.current);
    activeNodesRef.current.push(chordGain);

    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, ctx.currentTime);
      filter.Q.setValueAtTime(1, ctx.currentTime);

      osc.connect(filter);
      filter.connect(chordGain);

      osc.start();
      osc.stop(ctx.currentTime + 6);
      activeNodesRef.current.push(osc);
    });
  };

  const startAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(isMuted ? 0 : 0.6, ctx.currentTime);

    const delay = ctx.createDelay(1);
    delay.delayTime.setValueAtTime(0.4, ctx.currentTime);

    const delayGain = ctx.createGain();
    delayGain.gain.setValueAtTime(0.4, ctx.currentTime);

    delay.connect(delayGain);
    delayGain.connect(delay);
    masterGain.connect(ctx.destination);
    masterGain.connect(delay);
    delay.connect(ctx.destination);

    masterGainRef.current = masterGain;

    let chordIndex = 0;
    const tick = () => {
      playChord(chords[chordIndex]);
      chordIndex = (chordIndex + 1) % chords.length;
    };
    tick();
    intervalRef.current = window.setInterval(tick, 6000);
  };

  const stopAudio = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    activeNodesRef.current.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as OscillatorNode).stop === 'function') {
          (node as OscillatorNode).stop();
        }
      } catch {
        // Node already stopped
      }
    });
    activeNodesRef.current = [];
    if (audioCtxRef.current) {
      audioCtxRef.current.close().then(() => {
        audioCtxRef.current = null;
      });
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setValueAtTime(0.6, audioCtxRef.current.currentTime);
      }
      setIsMuted(false);
    } else {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      }
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[95] flex items-center gap-2">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            className="bg-[#101010]/95 backdrop-blur-md border border-primary/10 pl-4 pr-5 py-3 rounded-full flex items-center gap-4 shadow-xl"
          >
            {/* Spinning disc avatar */}
            <div className="relative w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center overflow-hidden">
              <motion.div
                className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center"
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              >
                <Music className="w-4 h-4 text-primary/60" />
              </motion.div>
              <div className="absolute w-2 h-2 rounded-full bg-black border border-primary/25" />
            </div>

            {/* Track Info */}
            <div className="flex flex-col min-w-[120px]">
              <span className="text-[10px] text-primary/45 uppercase tracking-wider font-mono">
                Now Playing
              </span>
              <span className="text-xs text-primary font-medium truncate max-w-[150px]">
                {trackName}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-primary hover:bg-[#D4D1BD] flex items-center justify-center transition-colors text-black"
                data-cursor="pointer"
                title={isPlaying ? 'Pause ambient synth' : 'Play ambient synth'}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-black" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
                )}
              </button>

              <button
                onClick={toggleMute}
                disabled={!isPlaying}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                  isPlaying
                    ? isMuted
                      ? 'border-red-500/30 text-red-400 bg-red-950/20'
                      : 'border-primary/10 text-primary/60 hover:text-primary hover:border-primary/30'
                    : 'border-primary/5 text-primary/20 cursor-not-allowed'
                }`}
                data-cursor={isPlaying ? 'pointer' : undefined}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pill Toggle Button */}
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-11 h-11 rounded-full bg-[#101010]/95 backdrop-blur-md border border-primary/15 hover:border-primary/30 hover:bg-[#141414] shadow-xl flex items-center justify-center text-primary transition-all duration-200"
        data-cursor="pointer"
        aria-label={isExpanded ? 'Collapse audio player' : 'Expand audio player'}
      >
        {isExpanded ? <X className="w-4 h-4" /> : <Disc className="w-4 h-4" />}
      </button>
    </div>
  );
};
