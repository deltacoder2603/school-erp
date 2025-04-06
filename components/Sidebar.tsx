import Link from "next/link";
import { 
  BookOpen, 
  BarChart, 
  MessageCircle, 
  Calendar, 
  Settings, 
  Users, 
  FileText 
} from "lucide-react";

const studentLinks = [
  { href: "/dashboard", label: "Dashboard", icon: <BookOpen size={20} /> },
  { href: "/syllabus", label: "Syllabus Tracker", icon: <FileText size={20} /> },
  { href: "/tests", label: "Daily Tests", icon: <Calendar size={20} /> },
  { href: "/doubts", label: "Doubt Solver", icon: <MessageCircle size={20} /> },
];

const teacherLinks = [
  { href: "/dashboard", label: "Dashboard", icon: <BookOpen size={20} /> },
  { href: "/curriculum", label: "Curriculum Progress", icon: <FileText size={20} /> },
  { href: "/analytics", label: "Skill Analytics", icon: <BarChart size={20} /> },
  { href: "/assistant", label: "AI Assistant", icon: <MessageCircle size={20} /> },
  { href: "/reports", label: "Weekly Reports", icon: <Users size={20} /> },
];

// For demo purposes, we'll show both student and teacher links
// In a real app, you'd determine this based on user role
const isTeacher = false;
const links = isTeacher ? teacherLinks : studentLinks;

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-6">
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="pt-6 mt-6 border-t border-gray-200">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}