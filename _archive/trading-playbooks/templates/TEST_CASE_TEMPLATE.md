# TEST_CASE_TEMPLATE.md - Test Case Document

## Project Information
```yaml
project: "[Project Name]"
prd_version: "[PRD Version]"
test_strategy_version: "[Test Strategy Version]"
date: "[YYYY-MM-DD]"
tester: "[Tester Agent Name]"
```

## Test Case Format
```yaml
test_cases:
  - id: "TC-001"
    description: "[Brief description of what is being tested]"
    user_story: "[Corresponding user story from PRD]"
    priority: "P0/P1/P2" (P0 = Critical, P1 = Important, P2 = Nice-to-have)
    test_type: "Functional/UI/Integration/Performance/Security/Accessibility"
    preconditions:
      - "[Condition that must be true before test]"
      - "[Condition that must be true before test]"
    test_steps:
      - step: 1
        action: "[Action to perform]"
        expected_result: "[Expected outcome]"
      - step: 2
        action: "[Action to perform]"
        expected_result: "[Expected outcome]"
      - step: 3
        action: "[Action to perform]"
        expected_result: "[Expected outcome]"
    test_data:
      - "[Required test data]"
      - "[Required test data]"
    postconditions:
      - "[State after test execution]"
  - id: "TC-002"
    description: "[Brief description]"
    user_story: "[Corresponding user story]"
    priority: "P0/P1/P2"
    test_type: "[Test type]"
    preconditions: [...]
    test_steps: [...]
    test_data: [...]
    postconditions: [...]
```

## Test Execution Log
```yaml
test_execution:
  execution_id: "EXEC-[YYYYMMDD]-[SEQ]"
  start_time: "[Timestamp]"
  end_time: "[Timestamp]"
  environment: "Development/Staging/Production"
  tester: "[Tester Name]"
  results:
    - test_case_id: "TC-001"
      status: "Pass/Fail/Blocked/Skipped"
      actual_result: "[What actually happened]"
      notes: "[Any observations, screenshots, logs]"
      bugs: "[Bug IDs if failed]"
      execution_time: "[Time taken in seconds]"
    - test_case_id: "TC-002"
      status: "Pass/Fail/Blocked/Skipped"
      actual_result: "[What actually happened]"
      notes: "[Any observations]"
      bugs: "[Bug IDs if failed]"
      execution_time: "[Time taken in seconds]"
```

## Bug Reporting Format
```yaml
bugs:
  - id: "BUG-[YYYYMMDD]-[SEQ]"
    title: "[Brief description of the bug]"
    severity: "Critical/High/Medium/Low"
    priority: "P0/P1/P2"
    test_case_id: "TC-XXX"
    environment: "[Where bug was found]"
    steps_to_reproduce:
      - "[Step 1]"
      - "[Step 2]"
      - "[Step 3]"
    expected_result: "[What should happen]"
    actual_result: "[What actually happens]"
    screenshots: "[Links to screenshots if available]"
    logs: "[Relevant log excerpts]"
    assigned_to: "[Agent assigned to fix]"
    status: "New/In Progress/Fixed/Verified/Closed"
    notes: "[Additional information]"
```

## Test Summary Report
```yaml
test_summary:
  total_test_cases: [number]
  executed: [number]
  passed: [number]
  failed: [number]
  blocked: [number]
  skipped: [number]
  pass_rate: "[percentage]"
  execution_time: "[total time]"
  bugs_found:
    total: [number]
    critical: [number]
    high: [number]
    medium: [number]
    low: [number]
  coverage:
    p0_coverage: "[percentage of P0 acceptance criteria tested]"
    p1_coverage: "[percentage of P1 acceptance criteria tested]"
    overall_coverage: "[percentage of all acceptance criteria tested]"
  recommendations:
    - "[Recommendation 1]"
    - "[Recommendation 2]"
    - "[Recommendation 3]"
  conclusion: "[Overall assessment of quality]"
```

## Quality Gates
### Must Pass Before Deployment
- [ ] All P0 test cases pass (100%)
- [ ] All critical/high severity bugs fixed and verified
- [ ] Overall pass rate ≥95%
- [ ] Test coverage ≥95% of acceptance criteria
- [ ] Performance requirements met
- [ ] Security requirements verified

### Optional (Nice to Have)
- [ ] All P1 test cases pass
- [ ] Automation scripts created for regression tests
- [ ] Load testing completed for expected traffic
- [ ] Accessibility testing completed

## Sign-off
- **Tester:** _________________ Date: _________
  - [ ] All quality gates passed
  - [ ] Test summary report complete
  - [ ] Bugs tracked and prioritized
  
- **Product Owner:** _________________ Date: _________
  - [ ] Test coverage adequate
  - [ ] Remaining bugs acceptable for release
  - [ ] Quality meets user expectations
  
- **CTO:** _________________ Date: _________
  - [ ] Technical quality acceptable
  - [ ] Performance and security verified
  - [ ] Ready for production deployment