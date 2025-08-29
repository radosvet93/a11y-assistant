import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logReport } from './log';
import { CustomViolation } from '../types';

describe('logReport', () => {
  const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => { });
  const processExitSpy = vi.spyOn(process, 'exit').mockImplementation((number) => { throw new Error(`process.exit: ${number}`); });

  beforeEach(() => {
    consoleLogSpy.mockClear();
    processExitSpy.mockClear();
  });

  it('should NOT log issues found and exit when report is empty', () => {
    const report: CustomViolation[] = [];
    const fullPath = 'test/file.html';

    expect(() => logReport(report, fullPath)).toThrow('process.exit: 0');

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('🎉 No accessibility issues found in: test/file.html'));
    expect(processExitSpy).toHaveBeenCalledWith(0);
  });

  it('should log issues correctly when report has violations', () => {
    const report: CustomViolation[] = [
      {
        valid: false,
        message: 'Image missing alt text',
        explanation: 'Images should have alt text for accessibility.',
        suggestion: 'Add alt text to the image.',
        helpUrl: 'https://example.com/image-alt',
        nodes: [{ html: '<img src="image.jpg">', line: 12, column: 2 }]
      },
      {
        valid: false,
        message: 'No <h1> heading found',
        explanation: 'Every page should have one <h1> heading to define its main topic.',
        suggestion: 'Add a single <h1> element that describes the main content of the page.',
        helpUrl: 'https://example.com/no-heading-one',
        nodes: [{ html: '', line: 0, column: 0 }]
      }
    ];
    const fullPath = 'test/file.html';

    logReport(report, fullPath);

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Accessibility checks completed for: test/file.html'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('🔎 A11y Assistant Report'));

    // Check first issue
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('❌ ISSUE 1: Image missing alt text'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Why: Images should have alt text for accessibility.'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Fix: Add alt text to the image.'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Link: https://example.com/image-alt'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('File: test/file.html'));

    // Check second issue
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('❌ ISSUE 2: No <h1> heading found'));

    // TODO: Fix test to check full explanation and suggestion text
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Why: Every page should have one <h1> heading to define its main'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Fix: Add a single <h1> element that describes the main content of the'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Link: https://example.com/no-heading-one'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('File: test/file.html'));

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Found 2 accessibility issue(s) in total.'));
    expect(processExitSpy).not.toHaveBeenCalled();
  });
});