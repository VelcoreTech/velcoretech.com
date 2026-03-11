/**
 * Tracking.tsx - Utility for tracking form submissions and CTAs
 * Generates URL parameters to track source of leads with encoded IDs
 * for cleaner URLs and better security.
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

type SourceInfo = {
  page: string;
  location: string;
  cta: string;
  timestamp?: string;
  random?: string;
};

// ============================================
// ENCODING MAPS - Convert readable names to short codes
// ============================================

// Page IDs (2-letter codes for cleaner URLs)
const pageCodes: Record<string, string> = {
  // Core pages
  'home': 'HM',
  'services': 'SV',
  'pricing': 'PR',
  'industries': 'IN',
  'about': 'AB',
  'contact': 'CT',
  'assessment': 'AS',
  
  // Service pages
  'managed-it': 'MI',
  'cloud': 'CL',
  'governance': 'GV',
  'audit-ready': 'AR',
  'edge': 'ED',
  'endpoint': 'EP',
  'networking': 'NW',
  'cybersecurity': 'CS',
  
  // Legal pages
  'privacy': 'PV',
  'legal': 'LG',
  'terms': 'TM',
  
  // Location pages
  'santa-cruz': 'SC',
  'bay-area': 'BA',
  'monterey-bay': 'MB',
};

// Location/Section codes (1-2 letter codes)
const locationCodes: Record<string, string> = {
  // Global sections
  'hero': 'H',
  'footer': 'F',
  'nav': 'N',
  'final_cta': 'FC',
  'cta': 'C',
  'related': 'R',
  
  // Home page
  'services_grid': 'SG',
  'services_section': 'SS',
  'process_step_01': 'P1',
  'process_step_02': 'P2',
  'process_step_03': 'P3',
  'process_step_01_mobile': 'M1',
  'process_step_02_mobile': 'M2',
  'process_step_03_mobile': 'M3',
  'serving_section': 'SV',
  'serving_section_buttons': 'SB',
  
  // About page
  'team_section': 'TM',
  
  // Pricing page
  'plan_card': 'PC',
  'compare_table': 'CP',
  'compare_footer': 'CF',
  
  // Industries page
  'nonprofit_callout': 'NP',
  
  // Service pages
  'engagement': 'EG',
  'onboarding': 'ON',
  'explore': 'EX',
  
  // Cloud services
  'cloud': 'CL',
  'cloud-migration': 'CM',
  
  // Local pages
  'bay_area_link': 'BL',
  'santa-cruz': 'SC',
  'santa-cruz-managed-it': 'SM',
  'santa-cruz-cybersecurity': 'SY',
  'santa-cruz-edge-security': 'SE',
  'santa-cruz-cloud-migration': 'SX',
};

// CTA Action codes (2-3 letter codes)
const actionCodes: Record<string, string> = {
  'assessment': 'AS',
  'contact': 'CT',
  'contact_us': 'CU',
  'schedule_call': 'SC',
  'schedule_consultation': 'SCN',
  'view_managed_it': 'VMI',
  'view_cybersecurity': 'VCS',
  'view_all_services': 'VAS',
  'learn_more': 'LM',
  'get_quote': 'GQ',
  'talk_to_us': 'TT',
  'work_with_us': 'WW',
  'it_assessment': 'IA',
  'view_pricing': 'VP',
  'santa_cruz': 'SCZ',
  'bay_area': 'BYA',
  'monterey_bay': 'MBY',
  'save_settings': 'SV',
  'accept_all': 'AA',
  'deny': 'DN',
};

// ============================================
// REVERSE LOOKUP MAPS (for decoding)
// ============================================

const pageFromCode: Record<string, string> = Object.entries(pageCodes).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }), {}
);

const locationFromCode: Record<string, string> = Object.entries(locationCodes).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }), {}
);

const actionFromCode: Record<string, string> = Object.entries(actionCodes).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }), {}
);

// ============================================
// HUMAN-READABLE DISPLAY MAPS
// ============================================

const locationDisplayMap: Record<string, string> = {
  // Global sections
  'hero': 'Hero',
  'footer': 'Footer',
  'final_cta': 'Contact Us',
  'cta': 'Call to Action',
  'related': 'Related Services',
  
  // Home page
  'services_grid': 'Services Grid',
  'services_section': 'Services Section',
  'process_step_01': 'Step 1 - Baseline',
  'process_step_02': 'Step 2 - Controls', 
  'process_step_03': 'Step 3 - Operate',
  'process_step_01_mobile': 'Step 1 - Mobile',
  'process_step_02_mobile': 'Step 2 - Mobile',
  'process_step_03_mobile': 'Step 3 - Mobile',
  'serving_section': 'Serving Section',
  'serving_section_buttons': 'Serving Buttons',
  
  // About page
  'team_section': 'Meet the Team',
  
  // Pricing page
  'plan_card': 'Pricing Plan',
  'compare_table': 'Comparison Table',
  'compare_footer': 'Compare Footer',
  
  // Industries page
  'nonprofit_callout': 'Nonprofit Callout',
  
  // Service pages
  'engagement': 'Engagement Models',
  'onboarding': 'Onboarding',
  'explore': 'Explore Section',
  
  // Local pages
  'bay_area_link': 'Bay Area Link',
  'santa-cruz': 'Santa Cruz',
  'santa-cruz-managed-it': 'Santa Cruz Managed IT',
  'santa-cruz-cybersecurity': 'Santa Cruz Cybersecurity',
  'santa-cruz-edge-security': 'Santa Cruz Edge Security',
  'santa-cruz-cloud-migration': 'Santa Cruz Cloud Migration',
};

const ctaDisplayMap: Record<string, string> = {
  'assessment': 'Start Assessment',
  'contact': 'Contact Us',
  'contact_us': 'Contact Us',
  'schedule_call': 'Schedule Call',
  'schedule_consultation': 'Schedule Consultation',
  'view_managed_it': 'View Managed IT',
  'view_cybersecurity': 'View Cybersecurity',
  'view_all_services': 'View All Services',
  'learn_more': 'Learn More',
  'get_quote': 'Get Quote',
  'talk_to_us': 'Talk to Us',
  'work_with_us': 'Work With Us',
  'it_assessment': 'Start Assessment',
  'view_pricing': 'View Pricing',
  'santa_cruz': 'Santa Cruz',
  'bay_area': 'Bay Area',
  'monterey_bay': 'Monterey Bay',
  'save_settings': 'Save Settings',
  'accept_all': 'Accept All',
  'deny': 'Deny All',
};

// ============================================
// CORE TRACKING FUNCTIONS
// ============================================

/**
 * Generates a secure tracking ID with encoded information
 * Format: PAGE_CODE|LOCATION_CODE|ACTION_CODE|TIMESTAMP|RANDOM
 * Example: MI|H|AS|12345678|9876
 * 
 * @param page - The page name (e.g., 'home', 'managed-it', 'contact')
 * @param location - The section on the page (e.g., 'hero', 'footer', 'engagement')
 * @param action - The call-to-action identifier (e.g., 'assessment', 'schedule_call')
 * @returns Encoded tracking ID string
 */
export const getTrackingId = (
  page: string,
  location: string,
  action: string
): string => {
  const pageCode = pageCodes[page] || 'XX';
  const locationCode = locationCodes[location] || 'XX';
  const actionCode = actionCodes[action] || 'XX';
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `${pageCode}|${locationCode}|${actionCode}|${timestamp}|${random}`;
};

/**
 * Generates URL parameters for tracking (NEW VERSION - use this!)
 * @param page - The page name (e.g., 'home', 'managed-it', 'contact')
 * @param location - The section on the page (e.g., 'hero', 'footer', 'engagement')
 * @param action - The call-to-action identifier (e.g., 'assessment', 'schedule_call')
 * @returns URL parameter string (e.g., '?tid=MI|H|AS|12345678|9876')
 */
export const getTrackingParams = (
  page: string,
  location: string,
  action: string
): string => {
  const trackingId = getTrackingId(page, location, action);
  return `?tid=${encodeURIComponent(trackingId)}`;
};

// ============================================
// DECODING FUNCTIONS
// ============================================

/**
 * Parses a tracking ID back into its components
 * @param tid - The tracking ID from URL parameters
 * @returns Object with decoded information or null if invalid
 */
export const parseTrackingId = (tid: string): SourceInfo | null => {
  if (!tid) return null;
  
  const parts = tid.split('|');
  if (parts.length !== 5) return null;
  
  const [pageCode, locationCode, actionCode, timestamp, random] = parts;
  
  return {
    page: pageFromCode[pageCode] || 'unknown',
    location: locationFromCode[locationCode] || 'unknown',
    cta: actionFromCode[actionCode] || 'unknown',
    timestamp,
    random,
  };
};

// ============================================
// LEGACY SUPPORT (kept for backward compatibility)
// ============================================

/**
 * @deprecated Use getTrackingParams with the new format instead
 */
export const getTrackingParamsLegacy = (
  page: string, 
  location: string, 
  cta: string, 
  additionalParams?: Record<string, string>
): string => {
  const params = new URLSearchParams();
  params.set('source', `${page}_${location}_${cta}`);
  params.set('ts', Date.now().toString());
  
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      params.set(key, value);
    });
  }
  
  return `?${params.toString()}`;
};

/**
 * Parses a legacy tracking source string
 * @deprecated Use parseTrackingId instead
 */
export const parseTrackingSource = (source: string): SourceInfo | null => {
  if (!source) return null;
  
  const parts = source.split('_');
  if (parts.length >= 3) {
    return {
      page: parts[0],
      location: parts[1],
      cta: parts.slice(2).join('_'),
    };
  }
  return null;
};

// ============================================
// DISPLAY FUNCTIONS
// ============================================

/**
 * Gets a human-readable location name
 */
export const getLocationDisplay = (location: string): string => {
  return locationDisplayMap[location] || formatDisplayText(location);
};

/**
 * Gets a human-readable CTA name
 */
export const getCtaDisplay = (cta: string): string => {
  return ctaDisplayMap[cta] || formatDisplayText(cta);
};

/**
 * Formats internal code strings into readable text
 */
const formatDisplayText = (text: string): string => {
  return text
    .split(/[_-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// ============================================
// URL EXTRACTION FUNCTIONS
// ============================================

/**
 * Gets all tracking parameters from current URL
 */
export const getTrackingFromUrl = (): Record<string, string> | null => {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  const trackingParams: Record<string, string> = {};
  
  // Try new format first
  const tid = params.get('tid');
  if (tid) {
    trackingParams.tid = tid;
  }
  
  // Fallback to legacy format
  const source = params.get('source');
  if (source) {
    trackingParams.source = source;
  }
  
  const ts = params.get('ts');
  if (ts) {
    trackingParams.timestamp = ts;
  }
  
  return Object.keys(trackingParams).length > 0 ? trackingParams : null;
};

/**
 * Gets parsed tracking information with human-readable fields
 */
export const getTrackingInfo = (): {
  raw: SourceInfo | null;
  page: string;
  location: string;
  cta: string;
  timestamp?: string;
  formattedTime?: string;
  source?: string;
} | null => {
  const tracking = getTrackingFromUrl();
  if (!tracking) return null;
  
  // Try new format first
  if (tracking.tid) {
    const parsed = parseTrackingId(tracking.tid);
    if (parsed) {
      return {
        raw: parsed,
        page: parsed.page,
        location: getLocationDisplay(parsed.location),
        cta: getCtaDisplay(parsed.cta),
        timestamp: parsed.timestamp,
        formattedTime: parsed.timestamp 
          ? new Date(parseInt(parsed.timestamp)).toLocaleString()
          : undefined,
        source: tracking.tid,
      };
    }
  }
  
  // Fallback to legacy format
  if (tracking.source) {
    const parsed = parseTrackingSource(tracking.source);
    if (parsed) {
      return {
        raw: parsed,
        page: parsed.page,
        location: getLocationDisplay(parsed.location),
        cta: getCtaDisplay(parsed.cta),
        timestamp: tracking.timestamp,
        formattedTime: tracking.timestamp 
          ? new Date(parseInt(tracking.timestamp)).toLocaleString()
          : undefined,
        source: tracking.source,
      };
    }
  }
  
  return null;
};

/**
 * Formats tracking info for email inclusion
 */
export const formatTrackingForEmail = (): string => {
  const info = getTrackingInfo();
  if (!info) return 'Source: Direct visit';
  
  let output = '--- Lead Source Information ---\n';
  output += `Page: ${info.page}\n`;
  output += `Section: ${info.location}\n`;
  output += `CTA: ${info.cta}\n`;
  
  if (info.formattedTime) {
    output += `Clicked: ${info.formattedTime}\n`;
  }
  
  return output;
};

/**
 * Cleans tracking parameters from URL
 */
export const cleanTrackingFromUrl = (): void => {
  if (typeof window === 'undefined') return;
  
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  
  params.delete('tid');
  params.delete('source');
  params.delete('ts');
  
  const newUrl = params.toString() 
    ? `${url.pathname}?${params.toString()}${url.hash}`
    : `${url.pathname}${url.hash}`;
  
  window.history.replaceState({}, '', newUrl);
};

/**
 * Debug function to log current tracking info
 */
export const debugTracking = (): void => {
  if (process.env.NODE_ENV !== 'development') return;
  
  const info = getTrackingInfo();
  if (info) {
    console.log('🔍 Tracking Info:', {
      page: info.page,
      location: info.location,
      cta: info.cta,
      time: info.formattedTime,
      source: info.source,
    });
  } else {
    console.log('🔍 No tracking info found');
  }
};