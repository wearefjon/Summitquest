import DashboardMobileNav from "@/components/layout/DashboardMobileNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <DashboardMobileNav />
    </>
  );
}
