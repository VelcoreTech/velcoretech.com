// This file centralizes exports for better tree-shaking

// Layout components
export { Layout } from './layout/Layout';
export { Header } from './layout/Header';
export { Footer } from './layout/Footer';

// Common components
export { SectionHeader } from './common/SectionHeader';
export { FeatureCard } from './common/FeatureCard';
export { BottomBreadcrumbs } from './common/BottomBreadcrumbs';
export { CookieConsent } from './common/CookieConsent';

// UI components (re-export from shadcn)
export { Button } from './ui/button';
export { Input } from './ui/input';
export { Textarea } from './ui/textarea';
export { Label } from './ui/label';
export { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from './ui/select';
export { Toaster } from './ui/toaster';
export { useToast } from '@/hooks/use-toast';