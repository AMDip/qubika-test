export function timestamp() {
    return `${new Date().toISOString().replace(/[^\d]/g, '').slice(4)}`;
  }