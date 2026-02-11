
import React, { useState } from 'react';
import { Smartphone, Share, PlusSquare, ArrowUp, CheckCircle2, Copy, Check, ShieldCheck, Zap, ExternalLink, MousePointer2, Send, Monitor, AlertTriangle, XCircle, Search, Info, MonitorCheck, Tablet, ArrowRightCircle, Mail, Globe, Rocket, Shield } from 'lucide-react';

const MobileSetup: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyCurrentUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;