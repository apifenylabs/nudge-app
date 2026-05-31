import '@testing-library/jest-dom';

// Mock scrollIntoView for jsdom (no vi import needed — Element is real)
Element.prototype.scrollIntoView = () => {};
