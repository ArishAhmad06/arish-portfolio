/** Single source for the header links and the scroll-spy. Ids must match <Section id="...">. */
export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Teaching' },
  { id: 'certifications', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
] as const;

export const navIds = navItems.map((item) => item.id);
