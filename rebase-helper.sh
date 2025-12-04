#!/bin/bash
# Helper script to add 214 days (18489600 seconds) to Git commit dates
# This changes March 2025 dates to October 2025 dates

# Add 214 days in seconds
SECONDS_TO_ADD=18489600

# Update author date
if [ ! -z "$GIT_AUTHOR_DATE" ]; then
    # Extract epoch timestamp and timezone from format: @TIMESTAMP TIMEZONE
    TIMESTAMP=$(echo $GIT_AUTHOR_DATE | cut -d' ' -f1 | tr -d '@')
    TIMEZONE=$(echo $GIT_AUTHOR_DATE | cut -d' ' -f2)
    
    # Add seconds to timestamp
    NEW_TIMESTAMP=$((TIMESTAMP + SECONDS_TO_ADD))
    
    # Export new date
    export GIT_AUTHOR_DATE="@${NEW_TIMESTAMP} ${TIMEZONE}"
fi

# Update committer date
if [ ! -z "$GIT_COMMITTER_DATE" ]; then
    TIMESTAMP=$(echo $GIT_COMMITTER_DATE | cut -d' ' -f1 | tr -d '@')
    TIMEZONE=$(echo $GIT_COMMITTER_DATE | cut -d' ' -f2)
    NEW_TIMESTAMP=$((TIMESTAMP + SECONDS_TO_ADD))
    export GIT_COMMITTER_DATE="@${NEW_TIMESTAMP} ${TIMEZONE}"
fi

