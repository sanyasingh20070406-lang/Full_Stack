/**
 * Phase 4: QA & Unit Validation Script
 * Tests core utility functions for input sanitization and validation.
 */

// Function to validate task input
function validateTaskInput(input) {
    if (typeof input !== 'string') {
        return { isValid: false, message: 'Input must be a string.' };
    }
    const trimmed = input.trim();
    if (trimmed.length === 0) {
        return { isValid: false, message: 'Task cannot be empty.' };
    }
    if (trimmed.length > 100) {
        return { isValid: false, message: 'Task exceeds maximum length of 100 characters.' };
    }
    return { isValid: true, message: 'Validation successful.', sanitized: sanitizeHTML(trimmed) };
}

// Security helper: Escape HTML to prevent XSS
function sanitizeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

// Simple automated unit test suite runner
function runTests() {
    console.log("Running QA Unit Tests...");

    // Test 1: Empty input check
    const test1 = validateTaskInput("   ");
    console.assert(test1.isValid === false, "Test 1 Failed: Should reject empty inputs.");

    // Test 2: Valid input check
    const test2 = validateTaskInput("Complete internship report");
    console.assert(test2.isValid === true, "Test 2 Failed: Should accept valid text.");

    // Test 3: XSS sanitization check
    const test3 = validateTaskInput("<script>alert('hack')</script>");
    console.assert(test3.sanitized === "&lt;script&gt;alert(&#039;hack&#039;)&lt;/script&gt;", "Test 3 Failed: Should escape HTML tags.");

    console.log("All unit tests executed successfully!");
}

// Execute tests
runTests();
