"use client";

import { IconMail, IconPhone, IconUsers, IconX, IconMapPin, IconCalendar } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { strapiImage } from "@/lib/strapi/strapiImage";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  email?: string;
  phone?: string;
  image?: any;
  onLeave?: boolean;
  leaveDetails?: string;
  location?: string;
  startDate?: string;
}

interface TeamProps {
  heading: string;
  sub_heading: string;
  members?: TeamMember[];
}

const TeamMemberCard = ({ member, onClick }: { member: TeamMember; onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 group-hover:scale-[1.02]">
        {member.onLeave && (
          <div className="absolute top-4 right-4 bg-warning/10 text-warning text-xs px-3 py-1 rounded-full border border-warning/20">
            În Concediu
          </div>
        )}
        
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="relative">
            {member.image ? (
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/10">
                <Image
                  src={strapiImage(member.image.url)}
                  alt={member.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
            )}
            {!member.onLeave && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-white"></div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-accent mb-1 group-hover:text-primary transition-colors">
              {member.name}
            </h3>
            <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
            <p className="text-gray-600 text-sm line-clamp-2">{member.description}</p>
          </div>

          {/* Arrow */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Quick contact */}
        <div className="mt-4 flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {member.email && (
            <a 
              href={`mailto:${member.email}`} 
              className="text-gray-400 hover:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <IconMail className="w-4 h-4" />
            </a>
          )}
          {member.phone && (
            <a 
              href={`tel:${member.phone}`} 
              className="text-gray-400 hover:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <IconPhone className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const TeamMemberDrawer = ({ 
  member, 
  isOpen, 
  onClose, 
  members, 
  currentIndex, 
  onNavigate 
}: { 
  member: TeamMember | null; 
  isOpen: boolean; 
  onClose: () => void;
  members: TeamMember[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}) => {
  if (!member || !isOpen) return null;

  const canGoNext = currentIndex < members.length - 1;
  const canGoPrev = currentIndex > 0;

  const handleNext = () => {
    if (canGoNext) {
      onNavigate(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      onNavigate(currentIndex - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Drawer - Half screen width */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header with Navigation */}
            <div className="relative bg-gradient-to-br from-primary to-primary-dark p-8 text-white">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <IconX className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <div className="absolute top-6 left-6 flex space-x-2">
                <button
                  onClick={handlePrev}
                  disabled={!canGoPrev}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canGoNext}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Member Count */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                  {currentIndex + 1} din {members.length}
                </div>
              </div>
              
              {/* Member Info */}
              <div className="flex items-center space-x-6 mt-16">
                {member.image ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                    <Image
                      src={strapiImage(member.image.url)}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white/20 shadow-xl">
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                )}
                
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{member.name}</h2>
                  <p className="text-white/90 font-medium text-lg mb-3">{member.role}</p>
                  {member.onLeave && (
                    <div className="inline-flex items-center px-3 py-1 bg-warning/20 backdrop-blur-sm text-warning text-sm rounded-full border border-warning/30">
                      În Concediu
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-accent mb-4">Despre</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{member.description}</p>
                {member.leaveDetails && (
                  <p className="text-warning text-sm mt-4 italic bg-warning/5 p-3 rounded-lg border border-warning/20">{member.leaveDetails}</p>
                )}
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-bold text-accent mb-4">Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <IconMail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-accent">Email</p>
                        <p className="text-gray-600">{member.email}</p>
                      </div>
                    </a>
                  )}
                  
                  {member.phone && (
                    <a 
                      href={`tel:${member.phone}`}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <IconPhone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-accent">Telefon</p>
                        <p className="text-gray-600">{member.phone}</p>
                      </div>
                    </a>
                  )}
                  
                  {member.location && (
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconMapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-accent">Locație</p>
                        <p className="text-gray-600">{member.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {member.startDate && (
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconCalendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-accent">În echipă din</p>
                        <p className="text-gray-600">{member.startDate}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Member Navigation */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-accent mb-4">Echipa</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {members.map((teamMember, index) => (
                    <button
                      key={index}
                      onClick={() => onNavigate(index)}
                      className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                        index === currentIndex 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === currentIndex 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {teamMember.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`font-medium text-sm truncate ${
                            index === currentIndex ? 'text-primary' : 'text-accent'
                          }`}>
                            {teamMember.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{teamMember.role}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const Team = ({ heading, sub_heading, members = [] }: TeamProps) => {
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = (member: TeamMember) => {
    const memberIndex = members.findIndex(m => m === member);
    setSelectedMemberIndex(memberIndex >= 0 ? memberIndex : 0);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const navigateToMember = (index: number) => {
    setSelectedMemberIndex(index);
  };

  const selectedMember = members[selectedMemberIndex] || null;

  // Group members by category
  console.log('members', members)
  const leadership = members.filter(m => m.role.toLowerCase().includes('founder') || m.role.toLowerCase().includes('ceo') || m.role.toLowerCase().includes('leader'));
  const seniors = members.filter(m => m.role.toLowerCase().includes('senior'));
  const juniors = members.filter(m => m.role.toLowerCase().includes('junior'));
  const support = members.filter(m => !leadership.includes(m) && !seniors.includes(m) && !juniors.includes(m) && !m.onLeave);
  const onLeave = members.filter(m => m.onLeave);

  console.log('leadership', leadership)

  return (
    <>
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-6">
              <IconUsers className="w-4 h-4 mr-2" />
              Echipa iConta24
            </div>
            <h2 className="heading-2 mb-4">{heading}</h2>
            <p className="text-lead max-w-3xl mx-auto">{sub_heading}</p>
          </motion.div>

          {/* Team Members */}
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Leadership */}
            {leadership.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-accent mb-6 text-center">Leadership</h3>
                <div className="space-y-4">
                  {leadership.map((member, idx) => (
                    <TeamMemberCard 
                      key={idx} 
                      member={member} 
                      onClick={() => openDrawer(member)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Senior Team */}
            {seniors.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-accent mb-6 text-center">Contabili Seniori</h3>
                <div className="space-y-4">
                  {seniors.map((member, idx) => (
                    <TeamMemberCard 
                      key={idx} 
                      member={member} 
                      onClick={() => openDrawer(member)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Junior Team */}
            {juniors.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-accent mb-6 text-center">Contabili Juniori</h3>
                <div className="space-y-4">
                  {juniors.map((member, idx) => (
                    <TeamMemberCard 
                      key={idx} 
                      member={member} 
                      onClick={() => openDrawer(member)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Support Team */}
            {support.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-accent mb-6 text-center">Echipa de Suport</h3>
                <div className="space-y-4">
                  {support.map((member, idx) => (
                    <TeamMemberCard 
                      key={idx} 
                      member={member} 
                      onClick={() => openDrawer(member)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* On Leave */}
            {onLeave.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-accent mb-6 text-center">În Concediu</h3>
                <div className="space-y-4">
                  {onLeave.map((member, idx) => (
                    <TeamMemberCard 
                      key={idx} 
                      member={member} 
                      onClick={() => openDrawer(member)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {members.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center px-6 py-3 bg-secondary rounded-full">
                  <IconUsers className="w-5 h-5 text-primary mr-2" />
                  <span className="text-accent font-semibold">Membrii echipei vor fi afișați în curând</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Member Drawer */}
      <TeamMemberDrawer 
        member={selectedMember}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        members={members}
        currentIndex={selectedMemberIndex}
        onNavigate={navigateToMember}
      />
    </>
  );
};