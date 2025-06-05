#!/usr/bin/env python3
"""
Setup script for the Car Price Prediction backend.
This script helps set up the development environment.
"""
import os
import sys
import subprocess
import platform
from pathlib import Path

def print_header(text):
    """Print formatted header."""
    print("\n" + "=" * 50)
    print(f" {text}".center(50))
    print("=" * 50 + "\n")

def run_command(command, cwd=None):
    """Run a shell command."""
    try:
        process = subprocess.Popen(
            command,
            shell=True,
            cwd=cwd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True
        )
        stdout, stderr = process.communicate()
        
        if process.returncode != 0:
            print(f"Error executing command: {command}")
            if stderr:
                print(f"Error: {stderr.strip()}")
            return False
        
        if stdout:
            print(stdout.strip())
        return True
    except Exception as e:
        print(f"Exception occurred: {str(e)}")
        return False

def check_python_version():
    """Check if Python version is 3.8 or higher."""
    if sys.version_info < (3, 8):
        print("Python 3.8 or higher is required.")
        sys.exit(1)
    print(f"✓ Python {sys.version.split()[0]} detected")

def create_virtualenv():
    """Create a Python virtual environment if it doesn't exist."""
    venv_dir = "venv"
    if not os.path.exists(venv_dir):
        print("Creating virtual environment...")
        if not run_command(f"python -m venv {venv_dir}"):
            print("Failed to create virtual environment.")
            sys.exit(1)
    else:
        print("✓ Virtual environment already exists")
    
    # Activate virtual environment and install requirements
    if platform.system() == "Windows":
        activate_script = os.path.join(venv_dir, "Scripts", "activate")
        pip = os.path.join(venv_dir, "Scripts", "pip")
    else:
        activate_script = os.path.join(venv_dir, "bin", "activate")
        pip = os.path.join(venv_dir, "bin", "pip")
    
    # Install requirements
    print("Installing Python dependencies...")
    if not run_command(f"{pip} install -r requirements.txt"):
        print("Failed to install Python dependencies.")
        sys.exit(1)
    
    print("✓ Python dependencies installed")

def setup_backend():
    """Set up the backend environment."""
    print_header("Setting Up Backend Environment")
    
    # Check Python version
    check_python_version()
    
    # Create and activate virtual environment
    create_virtualenv()
    
    # Create necessary directories
    os.makedirs("model_artifacts", exist_ok=True)
    os.makedirs("data", exist_ok=True)
    
    print("\nBackend setup complete!")
    print("\nNext steps:")
    print("1. Place your data.csv file in the backend/data/ directory")
    print("2. Run 'python train_model_final.py' to train the model")
    print("3. Start the Flask server with 'python app.py'")
    print("\nFor development, activate the virtual environment with:")
    if platform.system() == "Windows":
        print("  .\\venv\\Scripts\\activate")
    else:
        print("  source venv/bin/activate")

if __name__ == "__main__":
    setup_backend()
