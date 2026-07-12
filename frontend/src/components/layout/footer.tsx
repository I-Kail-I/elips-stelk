import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { title: 'sejarah', href: '/sejarah' },
    { title: 'anggota', href: '/anggota' },
    { title: 'Visi dan Misi', href: '/visi-dan-misi' },
  ];

  return (
    <footer className="border-t border-border/20 bg-muted px-6 py-12 font-sans text-muted-foreground md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Top Section */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column: Brand & Description */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/ELIPS.jpeg"
                alt="ELIPS Logo"
                width={40}
                height={40}
                className="rounded-md object-cover"
              />
              <span className="text-foreground text-xl font-bold tracking-tight">ELIPS</span>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              Eskul IoT kami menjadi wadah bagi siswa untuk mengeksplorasi sensor, mikrokontroler,
              dan otomasi cerdas guna membangun inovasi nyata.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3 pt-4">
              <Link
                href="https://www.instagram.com/elipstelk/"
                aria-label="Instagram"
                className="bg-accent text-accent-foreground hover:text-muted-foreground/50 flex items-center justify-center rounded-full p-2 transition-all"
              >
                {/* Raw SVG for Instagram */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Profil Organisasi */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-foreground text-sm font-semibold tracking-wider uppercase">
              Profil Organisasi
            </h3>
            {navItems.map((item, key) => (
              <nav className="flex flex-col space-y-3" key={key}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-accent text-sm transition-colors"
                >
                  {item.title}
                </Link>
              </nav>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-8 h-70 w-full overflow-hidden rounded-xl border border-border/20 bg-card shadow-sm">
          <iframe
            title="Lokasi Elips"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15894.395540338895!2d119.4376231!3d-5.1680436!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee32da1a075d3%3A0x88e9cc6030cfa1dd!2sSMK%20TELKOM%20Makassar!5e0!3m2!1sen!2sid!4v1783846642787!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="contrast-[1.1] grayscale-20"
            // eslint-disable-next-line style/jsx-closing-tag-location
          ></iframe>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between border-t border-border/10 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {currentYear} ELIPS. All rights reserved.</p>
          <Link href="/" className="mt-4 transition-colors hover:text-foreground md:mt-0">
            elips-iot.id
          </Link>
        </div>
      </div>
    </footer>
  );
}
