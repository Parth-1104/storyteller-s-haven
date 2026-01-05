import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';



const Header = () => {
  const { user, isAdmin, signOut, loading } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className=" rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <img className='h-9 w-9 rounded-full'  src={logo} alt="" />
            </div>
            <span className="text-[#003332] text-2xl font-bold ">
            अक्षरा<span className="text-[#0D818B]">वृत</span>
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className="font-body text-[#0D818B] hover:text-[#0D818B] transition-colors"
            >
              Stories
            </Link>


            <Link
              to="/about"
              className="font-body text-[#0D818B] hover:text-[#0D818B] transition-colors"
            >
              About me 
            </Link>

            
            {!loading && (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="font-body">
                      Admin
                    </Button>
                  </Link>
                )}
                
                {user ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="font-body"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Link to="/auth">
                    <Button variant="default" size="sm" className="font-body text-[#003332] gap-2">
                      <LogIn className="w-4 h-4" />
                       Login
                    </Button>
                  </Link>
                )}
              </>
            )}

            
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
