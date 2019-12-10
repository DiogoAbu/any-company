export default function getInitials(name: string) {
  return name.replace(/[^A-Z]/g, '');
}
