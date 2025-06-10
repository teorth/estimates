## How to run tests

Under project directory, run:

```
% export PYTHONPATH=$PWD/src
% python -m pytest
```

## Notes

It can take some seconds to run the tests, as `complex_littlewood_paley_solution` takes longer.

Currently solution output may differ because of the non-deterministic ordered data structure, tests only check if output contains characteristic substring like "Proof complete!" for now.