import {
  Activity, AlarmClock, ArrowRight, Bed, BookOpen, Box, ChevronRight, Brain, BrainCircuit, Car, Check, Coffee, Cpu, Ear, Eye, Flame, FlaskConical,
  Footprints, Hand, Heart, HeartPulse, Hourglass, Lamp, Laptop, Library, Lightbulb, MessageSquareText, Moon, MoonStar,
  Music, Pause, PersonStanding, Play, Presentation, RotateCcw, Scale, ScanEye, SkipBack, SkipForward, SlidersHorizontal, Sparkles,
  Sunrise, Users, Wind, Workflow, X, Zap, type LucideIcon,
} from 'lucide-react'

/** Line icons by name; data files (tours, scenario) refer to icons by these keys. */
const ICONS: Record<string, LucideIcon> = {
  activity: Activity, 'alarm-clock': AlarmClock, 'arrow-right': ArrowRight, bed: Bed, 'book-open': BookOpen, box: Box, chevron: ChevronRight, brain: Brain,
  'brain-circuit': BrainCircuit, car: Car, check: Check, coffee: Coffee, cpu: Cpu, ear: Ear, eye: Eye, flame: Flame,
  flask: FlaskConical, footprints: Footprints, hand: Hand, heart: Heart, 'heart-pulse': HeartPulse, hourglass: Hourglass,
  lamp: Lamp, laptop: Laptop, library: Library, lightbulb: Lightbulb, 'message-square-text': MessageSquareText, moon: Moon,
  'moon-star': MoonStar, music: Music, pause: Pause, 'person-standing': PersonStanding, play: Play,
  presentation: Presentation, rotate: RotateCcw, scale: Scale, 'scan-eye': ScanEye, 'skip-back': SkipBack, 'skip-forward': SkipForward,
  sliders: SlidersHorizontal, sparkles: Sparkles, sunrise: Sunrise, users: Users, wind: Wind, workflow: Workflow, x: X, zap: Zap,
}

export function Icon({ name, size = 15, className }: { name: string; size?: number; className?: string }) {
  const C = ICONS[name] ?? Activity
  return <C size={size} strokeWidth={1.6} className={className} aria-hidden />
}
