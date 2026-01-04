# Voice Assistant Fixes - TODO

## Phase 1: Environment Variables

- [x] Add `NEXT_PUBLIC_VAPI_API_KEY=eaca5422-eca6-4653-92fc-8ec899e6cebf` to `.env`

## Phase 2: Update voiceassistance.jsx

- [x] Use `process.env.NEXT_PUBLIC_VAPI_API_KEY` instead of hardcoded key
- [x] Remove unused `addTopping` and `goToCheckout` function call handlers
- [x] Fix duplicate event listener issue (merge message handlers)
- [x] Add cleanup function on unmount

## Phase 3: Cleanup Individual Assistant Files

- [x] Update sugarsaathi.js - use env var, fix event listeners, remove unused code
- [x] Update hearthelp.js - use env var, fix event listeners, remove unused code
- [x] Update jeevansaathi.js - use env var, fix event listeners, remove unused code
- [x] Update mannsaathi.js - use env var, fix event listeners, remove unused code
- [x] Update naricare.js - use env var, fix event listeners, remove unused code
- [x] Update oncosathi.js - use env var, fix event listeners, remove unused code

## Phase 4: Manual Step Required

⚠️ **IMPORTANT**: You must manually add the following line to your `.env` file:

```
NEXT_PUBLIC_VAPI_API_KEY=eaca5422-eca6-4653-92fc-8ec899e6cebf
```

## Phase 5: Testing

- [ ] Verify all voice assistants load correctly
- [ ] Test call start/stop functionality
