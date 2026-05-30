'use client';

import {
 DollarSign, TrendingUp, FileText, Shield, Globe, BookOpen, Users, Target, Star, Lightbulb,
 Clock, Zap, ShoppingCart, Rocket, Activity, Calendar, Search, Image,
 MapPin, Phone, Mail, Link, ChevronRight, CheckCircle, ArrowLeft, Download, Sparkles,
 Play, Camera, Heart, Home, Settings, User, Plus, Minus, X, Menu, Sun, Moon,
 AlertCircle, Info, AlertTriangle, ChevronDown, ChevronUp, ArrowRight, ExternalLink,
 Award, BadgeCheck, Brain, Briefcase, Building, CreditCard, Crown, Cpu,
 Eye, File, Flag, Folder, Gift, Github, Headphones, Infinity, Inbox,
 Key, Keyboard, Laptop, Layers, Layout, Library, List, Lock, LogIn,
 Megaphone, Mic, Monitor, Newspaper, Package, Paintbrush, Pencil,
 PiggyBank, Pin, Plane, Podcast, Power, RefreshCw, Repeat, Route, Save,
 Send, Server, Share, ShoppingBag, SlidersHorizontal, Smartphone, Smile,
 Speaker, Sprout, Terminal, ThumbsUp, Ticket, Timer, Trash, Trophy, Truck,
 Tv, Unlock, Upload, Usb, Utensils, Video, VideoOff, Volume2, Wallet,
 WandSparkles, Watch, Waves, Wifi, Workflow, Wrench, ZoomIn, ZoomOut,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
 DollarSign, TrendingUp, FileText, Shield, Globe, BookOpen, Users, Target, Star, Lightbulb,
 Clock, Zap, ShoppingCart, Rocket, Activity, Calendar, Search, Image,
 MapPin, Phone, Mail, Link, ChevronRight, CheckCircle, ArrowLeft, Download, Sparkles,
 Play, Camera, Heart, Home, Settings, User, Plus, Minus, X, Menu, Sun, Moon,
 AlertCircle, Info, AlertTriangle, ChevronDown, ChevronUp, ArrowRight, ExternalLink,
 Award, BadgeCheck, Brain, Briefcase, Building, CreditCard, Crown, Cpu,
 Eye, File, Flag, Folder, Gift, Github, Headphones, Infinity, Inbox,
 Key, Keyboard, Laptop, Layers, Layout, Library, List, Lock, LogIn,
 Megaphone, Mic, Monitor, Newspaper, Package, Paintbrush, Pencil,
 PiggyBank, Pin, Plane, Podcast, Power, RefreshCw, Repeat, Route, Save,
 Send, Server, Share, ShoppingBag, SlidersHorizontal, Smartphone, Smile,
 Speaker, Sprout, Terminal, ThumbsUp, Ticket, Timer, Trash, Trophy, Truck,
 Tv, Unlock, Upload, Usb, Utensils, Video, VideoOff, Volume2, Wallet,
 WandSparkles, Watch, Waves, Wifi, Workflow, Wrench, ZoomIn, ZoomOut,
};

interface IconRendererProps {
 name: string;
 className?: string;
}

export default function IconRenderer({ name, className }: IconRendererProps) {
 const Icon = iconMap[name];
 if (!Icon) return null;
 return <Icon className={className || 'w-5 h-5'} />;
}
