"""
WSGI config for Render deployment.
"""

import os
import sys
import subprocess

# Install required packages
subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])

# Now import the app
try:
    from backend.app import app
except ImportError as e:
    print(f"Error importing app: {e}")
    raise

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
