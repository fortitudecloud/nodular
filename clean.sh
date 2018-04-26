#!/bin/bash
echo "Deleting Node Modules" 
find -type d -name node_modules -exec rm -rf {} \;