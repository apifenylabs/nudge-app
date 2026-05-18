#!/usr/bin/env python3
"""Run all ORB tests."""
import sys
sys.path.insert(0, "/home/captain/.openclaw/workspace/trading-playbooks/scripts")

import os
os.chdir("/home/captain/.openclaw/workspace/trading-playbooks")

import runpy
runpy.run_path("scripts/test_orb.py", run_name="__main__")
