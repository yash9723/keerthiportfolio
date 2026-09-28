import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Disc, Music, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';

const TRACK_NAME = 'Ambient Chords (Web Synth)';
const CHORD_INTERVAL_MS = 6000;
const MASTER_VOLUME = 0.6;

// Cmaj7 → Am7 → Fmaj7 → G6, as oscillator frequencies in Hz
const CHORDS = [
  [130.81, 164.81, 196, 246.94],
  [110, 130.81, 164.81, 196],
  [87.31, 130.81, 174.61, 220],
  [98, 146.83, 196, 246.94]
];

type AudioNodeRef = OscillatorNode | GainNode;

/** Floating widget that synthesizes a slow ambient chord loop with the Web Audio API. */
export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<AudioNodeRef[]>([]);

  const stopNodes = () => {
    nodesRef.current.forEach((node) => {
      try {
        if ('stop' in node) node.stop();
      } catch {
        // Oscillator already stopped
      }
    });
    nodesRef.current = [];
  };

  const playChord = (freqs: number[]) => {
    const ctx = ctxRef.current;
    if (!ctx || !masterRef.current) return;
    stopNodes();

    const envelope = ctx.createGain();
    envelope.gain.setValueAtTime(0, ctx.currentTime);
    envelope.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.8);
    envelope.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 5.8);
    envelope.connect(masterRef.current);
    nodesRef.current.push(envelope);

    freqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, ctx.currentTime);
      filter.Q.setValueAtTime(1, ctx.currentTime);
      osc.connect(filter);
      filter.connect(envelope);
      osc.start();
      osc.stop(ctx.currentTime + 6);
      nodesRef.current.push(osc);
    });
  };

  const start = () => {
    if (!ctxRef.current) {
      const AudioCtx =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const master = ctx.createGain();
    master.gain.setValueAtTime(isMuted ? 0 : MASTER_VOLUME, ctx.currentTime);

    // Feedback delay for a soft echo tail
    const delay = ctx.createDelay(1);
    delay.delayTime.setValueAtTime(0.4, ctx.currentTime);
    const feedback = ctx.createGain();
    feedback.gain.setValueAtTime(0.4, ctx.currentTime);
    delay.connect(feedback);
    feedback.connect(delay);

    master.connect(ctx.destination);
    master.connect(delay);
    delay.connect(ctx.destination);
    masterRef.current = master;

    let chordIndex = 0;
    const next = () => {
      playChord(CHORDS[chordIndex]);
      chordIndex = (chordIndex + 1) % CHORDS.length;
    };
    next();
    intervalRef.current = window.setInterval(next, CHORD_INTERVAL_MS);
  };

  const stop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    stopNodes();
    ctxRef.current?.close().then(() => {
      ctxRef.current = null;
    });
  };

  useEffect(
    () => () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
      ctxRef.current?.close();
    },
    []
  );

  // Stay out of the hero's way: the toggle appears once the hero stats have scrolled off
  useEffect(() => {
    const handleScroll = () => setIsPastHero(window.scrollY > window.innerHeight * 0.6);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isShown = isPastHero || isExpanded || isPlaying;

  const togglePlay = () => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      start();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.setValueAtTime(isMuted ? MASTER_VOLUME : 0, ctxRef.current.currentTime);
    }
    setIsMuted(!isMuted);
  };

  const muteButtonClass = isPlaying
    ? isMuted
      ? 'border-red-500/30 text-red-400 bg-red-950/20'
      : 'border-primary/10 text-primary/60 hover:text-primary hover:border-primary/30'
    : 'border-primary/5 text-primary/20 cursor-not-allowed';

  return (
    <div
      className={`fixed bottom-6 left-6 z-[95] flex items-center gap-2 transition-[opacity,transform] duration-300 ease-out-strong ${
        isShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-hidden={!isShown}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.95, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            // Grow out of the toggle button on its left, not from the panel's center
            style={{ transformOrigin: 'left center' }}
            className="glass-blur pl-3 pr-3 py-2.5 rounded-full flex items-center gap-4"
          >
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

            <div className="flex flex-col min-w-[120px]">
              <span className="text-[10px] text-primary/60 uppercase tracking-wider font-mono">Now Playing</span>
              <span className="text-xs text-primary font-medium truncate max-w-[150px]">{TRACK_NAME}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="pressable w-8 h-8 rounded-full bg-primary hover:bg-[#D4D1BD] flex items-center justify-center text-black"
                data-cursor="pointer"
                aria-label={isPlaying ? 'Pause ambient synth' : 'Play ambient synth'}
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
                className={`w-8 h-8 rounded-full border flex items-center justify-center pressable ${muteButtonClass}`}
                data-cursor={isPlaying ? 'pointer' : undefined}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsExpanded((v) => !v)}
        tabIndex={isShown ? 0 : -1}
        aria-expanded={isExpanded}
        className="w-11 h-11 rounded-full glass-blur hover:bg-[rgba(34,30,26,0.6)] flex items-center justify-center text-primary pressable"
        data-cursor="pointer"
        aria-label={isExpanded ? 'Collapse audio player' : 'Expand audio player'}
      >
        {isExpanded ? <X className="w-4 h-4" /> : <Disc className="w-4 h-4" />}
      </button>
    </div>
  );
};
