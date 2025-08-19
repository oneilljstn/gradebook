import { ModeToggle } from "~/components/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { authClient } from "~/features/auth/lib/auth-client";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Menu, Github } from "lucide-react";

export function Header({
  isAuthenticated,
  image,
  name,
}: {
  isAuthenticated: boolean;
  image: string;
  name: string;
}) {
  return (
    <div className="border-b border-border bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <div className="items-center container mx-auto px-4 md:px-6 py-4 flex gap-2 md:gap-4 text-lg justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2 md:gap-8 flex-1 min-w-0">
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            Header
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="ring-2 ring-border hover:ring-blue-500/50 transition-all duration-300 cursor-pointer">
                  <AvatarImage src={image} />
                  <AvatarFallback className="bg-gradient-to-r from-gradient-primary to-gradient-secondary text-white">
                    {name}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => authClient.signOut()}
                  className="cursor-pointer"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {!isAuthenticated && (
            <Button
              onClick={() =>
                authClient.signIn.social({
                  provider: "google",
                })
              }
              className="modern-button"
            >
              Sign In
            </Button>
          )}
          <ModeToggle />
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />

          {/* Mobile Menu */}
          <Sheet>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 mt-8">
                {isAuthenticated && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <Avatar className="ring-2 ring-border">
                        <AvatarImage src={image} />
                        <AvatarFallback className="bg-gradient-to-r from-gradient-primary to-gradient-secondary text-white">
                          {name}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">
                        {name}
                      </span>
                    </div>
                    <Button
                      onClick={() => authClient.signOut()}
                      variant="outline"
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </div>
                )}

                {!isAuthenticated && (
                  <Button
                    onClick={() =>
                      authClient.signIn.social({
                        provider: "google",
                      })
                    }
                    className="modern-button w-full"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
