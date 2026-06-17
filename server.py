#!/usr/bin/env python3
"""Static file server for koracashmere.com — with clean URL rewriting"""
import http.server
import os
import urllib.parse

PORT = 4190
DIR = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def translate_path(self, path):
        """Override to support clean URLs without altering super().do_GET logic"""
        parsed = urllib.parse.urlparse(path)
        clean_path = parsed.path.rstrip('/') or '/'
        
        # Direct file match
        full = os.path.join(DIR, clean_path.lstrip('/'))
        if os.path.isfile(full):
            return full
        
        # Clean URL: /shop → /shop.html
        if '.' not in clean_path:
            html_path = os.path.join(DIR, clean_path.lstrip('/') + '.html')
            if os.path.isfile(html_path):
                return html_path
        
        # Static assets
        if clean_path.startswith('/css/') or clean_path.startswith('/js/') or clean_path.startswith('/img/'):
            return full
        
        # Fallback
        return super().translate_path(path)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

if __name__ == '__main__':
    os.chdir(DIR)
    server = http.server.HTTPServer(('0.0.0.0', PORT), Handler)
    print(f'Serving KORA on port {PORT} with clean URLs')
    server.serve_forever()
