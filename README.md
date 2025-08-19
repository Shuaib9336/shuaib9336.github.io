# Shuaib's GitHub Pages Website

Welcome to my personal GitHub Pages website! This site is designed with resilience and network error handling in mind.

## Features

### 🌐 Network Resilience
- **Connection Status Monitoring**: Real-time connection status display
- **Error Handling**: Comprehensive error handling for network issues
- **Retry Mechanisms**: Built-in retry functionality for failed connections
- **Offline Support**: Service worker provides offline capabilities

### 🎨 User Experience
- **Modern Design**: Clean, responsive design with gradient backgrounds
- **Performance Monitoring**: Page load time tracking
- **Status Notifications**: Real-time status updates and notifications
- **Cross-browser Compatibility**: Works across all modern browsers

### 🔧 Error Handling
- **Custom 404 Page**: Helpful error page with troubleshooting tips
- **Connection Diagnostics**: Built-in tools to diagnose network issues
- **Fallback Mechanisms**: Graceful degradation for offline scenarios

## Addressing Connection Issues

If you encounter `net::ERR_CONNECTION_RESET` or similar errors:

1. **Check Network Connection**: Ensure you have a stable internet connection
2. **DNS Settings**: Try using different DNS servers (8.8.8.8, 1.1.1.1)
3. **Firewall Rules**: Check if your firewall is blocking GitHub Pages
4. **Browser Cache**: Clear browser cache and cookies
5. **Try Different Network**: Test on mobile data or different WiFi

## Files

- `index.html` - Main homepage with connection monitoring
- `404.html` - Custom error page with troubleshooting guide
- `sw.js` - Service worker for offline support
- `README.md` - This documentation

## Local Development

To test locally:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`

## Deployment

This site automatically deploys via GitHub Pages when changes are pushed to the main branch.

---

Built with ❤️ by Shuaib