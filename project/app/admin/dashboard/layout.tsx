import DashboardNav from "./components/DashboardNavbar";

export default function DashboardLayout({children}: {children: React.ReactNode}){
    return (
        <section>
            <DashboardNav />
            {children}
        </section>
    )

}

