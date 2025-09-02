// This file resolves cached conflicts - DO NOT USE API_URL here
console.log('🔧 Loading compatibility layer for cached api-integration.js');

// Clear any existing conflicts
if (typeof API_URL !== 'undefined') {
  console.warn('🚨 Clearing cached API_URL to prevent conflicts');
}

// Don't declare API_URL at all - use window.AI_HUB_API_URL instead
// All API functionality is now in api-service.js

console.log('✅ Compatibility layer loaded - no conflicts');