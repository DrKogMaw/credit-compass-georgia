# Credit Compass Georgia

Static MVP for estimating how completed university courses may map to a destination curriculum.

Phase 1 includes normalized official curriculum data for TSU Computer Science (2021 curriculum) and GTU Computer Information Technologies (2024/25 curriculum): 96 course entries across eight semesters. Other visible programmes remain exploratory until their official curriculum is imported. Results are estimates, not official credit-recognition decisions.

The source-backed dataset is stored in `dist/data/real-university-catalog.json` and records each programme's curriculum version, course code, ECTS, suggested semester, matching topics and source URL.

The estimator also applies Georgian workload constraints: 30 ECTS is used as the semester planning baseline, 60 ECTS as the standard full academic-year load, and 75 ECTS as the national annual maximum. A semester above 30 is flagged for university approval; a reconstructed academic year above 75 is blocked until courses are redistributed. Recognized credits remain separate from newly registered workload.

## Run locally

Serve the project root with any static HTTP server and open `/dist/`.
