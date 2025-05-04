
import React, { useState } from 'react';
import { useProposal } from '../../context/ProposalContext';

interface AccordionItemProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen?: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  icon,
  isOpen = false,
  onToggle,
  children
}) => {
  return (
    <div className="accordion-item">
      <div
        className={`accordion-header ${isOpen ? 'active' : ''}`}
        onClick={() => onToggle(id)}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
            {icon}
          </div>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <div className="text-gray-400">
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

const iconMap: { [key: string]: React.ReactNode } = {
  partnership: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12" />
    </svg>
  ),
  goals: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  approach: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
  ),
  team: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  investment: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  outcomes: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  next: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  appendix: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
};

const ProposalAccordion: React.FC = () => {
  const { state } = useProposal();
  const { activeClient } = state;
  
  const [openSections, setOpenSections] = useState<string[]>(['partnership']);
  
  const toggleSection = (id: string) => {
    setOpenSections(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isSectionOpen = (id: string) => openSections.includes(id);

  return (
    <div className="accordion-container">
      <AccordionItem
        id="partnership"
        title="1. Continuing Our Partnership"
        icon={iconMap.partnership}
        isOpen={isSectionOpen('partnership')}
        onToggle={toggleSection}
      >
        <p className="mb-3">
          We sincerely value our partnership with <span className="data-placeholder">{activeClient}</span> and appreciate the opportunity to continue supporting your students and staff.
        </p>
        <p className="mb-3">
          Building on last year's successes, such as the positive impact observed in K-2 SEL support and staff feedback, we propose a refined service model for the upcoming school year.
        </p>
        <p>
          Stellar Steps' growth, including enhanced operations, allows us to offer even more effective and efficient support, reflecting our commitment to continuous improvement for our partners.
        </p>
      </AccordionItem>

      <AccordionItem
        id="goals"
        title={`2. Understanding ${activeClient}'s Goals`}
        icon={iconMap.goals}
        isOpen={isSectionOpen('goals')}
        onToggle={toggleSection}
      >
        <p className="mb-3">
          Based on our collaborative discussions, we understand that <span className="data-placeholder">{activeClient}</span> is focused on:
        </p>
        <ul className="list-disc ml-6 mb-3 space-y-1">
          <li>Enhancing social-emotional support for all students</li>
          <li>Providing targeted interventions for students with specific needs</li>
          <li>Building staff capacity through professional development and coaching</li>
          <li>Creating sustainable systems that will continue beyond our direct support</li>
        </ul>
        <p>
          Our proposed model is specifically designed to address these priorities while maintaining flexibility to adapt to emerging needs throughout the year.
        </p>
      </AccordionItem>

      <AccordionItem
        id="approach"
        title="3. Our Approach: Tiered Support Framework"
        icon={iconMap.approach}
        isOpen={isSectionOpen('approach')}
        onToggle={toggleSection}
      >
        <p className="mb-4">
          We utilize an evidence-based Tiered Model (MTSS) for efficient, needs-matched support. Our approach focuses on proactive strategies and building capacity within your school community.
        </p>

        <div className="service-model-list">
          <div className="service-model-item">
            <h4 className="font-medium text-green-700 mb-2">Tier 1 (Universal)</h4>
            <p className="text-sm">
              Foundational strategies for all students & staff (e.g., Staff PD on proactive management, Systems Consultation for routines/reinforcement).
            </p>
          </div>
          
          <div className="service-model-item">
            <h4 className="font-medium text-amber-600 mb-2">Tier 2 (Targeted)</h4>
            <p className="text-sm">
              Early intervention for some students (e.g., Social Skills Groups, Focused Teacher/TA Coaching, Data Support).
            </p>
          </div>
          
          <div className="service-model-item">
            <h4 className="font-medium text-red-600 mb-2">Tier 3 (Intensive)</h4>
            <p className="text-sm">
              Individualized support for few students (e.g., BIP Development post-FBA, 1:1 Intervention, Implementation Training).
            </p>
          </div>
          
          <div className="service-model-item">
            <h4 className="font-medium text-blue-600 mb-2">Cross-Tier</h4>
            <p className="text-sm">
              Essential functions supporting all tiers (e.g., Ongoing BCBA Consultation, FBA as needed, Parent Training, Supervision).
            </p>
          </div>
        </div>
      </AccordionItem>

      <AccordionItem
        id="team"
        title="4. Your Stellar Steps Team"
        icon={iconMap.team}
        isOpen={isSectionOpen('team')}
        onToggle={toggleSection}
      >
        <p className="mb-4">
          We provide a dedicated, multi-disciplinary team, balancing experienced direct support with senior clinical oversight.
        </p>

        <div className="team-list">
          <div className="team-member-card">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Clinical Director</h4>
                <p className="text-xs text-gray-600">Rate: $185.00/hr</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Provides overall clinical leadership & quality assurance.</span>
              </li>
              <li className="flex">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Consults on program development & high-level strategy.</span>
              </li>
              <li className="flex">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Ensures alignment with best practices & ethical standards.</span>
              </li>
            </ul>
          </div>

          <div className="team-member-card">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Senior BCBA/ECD</h4>
                <p className="text-xs text-gray-600">Rate: $150.00/hr</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Serves as primary clinical lead & point person.</span>
              </li>
              <li className="flex">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Develops/oversees Tier 1 strategies & trainings.</span>
              </li>
              <li className="flex">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Conducts FBAs/BIPs & leads targeted trainings.</span>
              </li>
            </ul>
          </div>

          <div className="team-member-card">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Behavior Technician</h4>
                <p className="text-xs text-gray-600">Rate: $90.00/hr</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Delivers direct 1:1 ABA intervention (Tier 3) per BIPs.</span>
              </li>
              <li className="flex">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>May co-facilitate Tier 2 groups/interventions.</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-4 text-sm">
          Clinical oversight and operational support ensure high-quality, consistent service delivery throughout our partnership.
        </p>
      </AccordionItem>

      <AccordionItem
        id="investment"
        title="5. Partnership Investment"
        icon={iconMap.investment}
        isOpen={isSectionOpen('investment')}
        onToggle={toggleSection}
      >
        <p className="mb-4">
          Our flexible model allows tailoring service hours to <span className="data-placeholder">{activeClient}</span>'s needs. Based on our discussion, we propose the following estimated weekly allocation:
        </p>

        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <p className="font-medium">Clinical Director:</p>
            <p className="bg-blue-50 px-2 py-1 rounded">
              <span className="data-placeholder">5.0</span> hrs/week
            </p>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <p className="font-medium">Senior BCBA/ECD:</p>
            <p className="bg-blue-50 px-2 py-1 rounded">
              <span className="data-placeholder">15.0 - 25.0</span> hrs/week
            </p>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <p className="font-medium">Behavior Technician:</p>
            <p className="bg-blue-50 px-2 py-1 rounded">
              <span className="data-placeholder">15.0 - 30.0</span> hrs/week
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <p className="font-medium">Social Skills Coach:</p>
            <p className="bg-blue-50 px-2 py-1 rounded">
              <span className="data-placeholder">0.0 - 5.0</span> hrs/week
            </p>
          </div>
        </div>

        <div className="investment-summary-box">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <h4 className="text-sm mb-2">Estimated Monthly Range</h4>
              <p className="text-xl font-bold text-blue-700">
                <span className="data-placeholder">$19,606.83 - $33,580.75</span>
              </p>
              <p className="text-xs mt-1 text-gray-500">
                (Approx. <span className="data-placeholder">4.3</span> weeks/month)
              </p>
            </div>
            
            <div className="text-center">
              <h4 className="text-sm mb-2">Estimated Yearly Range</h4>
              <p className="text-xl font-bold text-blue-700">
                <span className="data-placeholder">$181,000.00 - $310,000.00</span>
              </p>
              <p className="text-xs mt-1 text-gray-500">
                (Based on <span className="data-placeholder">40</span> weeks)
              </p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm">
          This investment reflects the comprehensive support, clinical expertise, and operational efficiency provided. We are committed to working with you to finalize a package that meets your needs effectively and transparently.
        </p>
      </AccordionItem>

      <AccordionItem
        id="outcomes"
        title="6. Expected Outcomes & Impact"
        icon={iconMap.outcomes}
        isOpen={isSectionOpen('outcomes')}
        onToggle={toggleSection}
      >
        <p className="mb-3">
          Through our partnership, <span className="data-placeholder">{activeClient}</span> can expect the following outcomes:
        </p>
        
        <ul className="list-disc ml-6 mb-3 space-y-1">
          <li>Improved school climate and reduction in behavior incidents school-wide</li>
          <li>Enhanced capacity of staff to implement effective behavior support strategies</li>
          <li>Development of sustainable systems and processes that will continue beyond our direct support</li>
          <li>Targeted progress for students receiving individualized interventions</li>
          <li>Data-driven decision making for both school-wide and individual interventions</li>
        </ul>
        
        <p>
          We will measure impact through regular data collection, staff surveys, and collaborative reviews with your leadership team.
        </p>
      </AccordionItem>

      <AccordionItem
        id="next"
        title="7. Next Steps"
        icon={iconMap.next}
        isOpen={isSectionOpen('next')}
        onToggle={toggleSection}
      >
        <ol className="list-decimal ml-6 mb-3 space-y-2">
          <li>Review proposal and provide feedback on any adjustments needed</li>
          <li>Finalize service package and schedule</li>
          <li>Schedule kickoff meeting with key stakeholders</li>
          <li>Begin onboarding and initial assessments</li>
          <li>Implement Tier 1 strategies and systems</li>
        </ol>
        
        <p>
          We look forward to continuing our partnership and supporting <span className="data-placeholder">{activeClient}</span>'s goals for the upcoming school year.
        </p>
      </AccordionItem>

      <AccordionItem
        id="appendix"
        title="8. Appendix"
        icon={iconMap.appendix}
        isOpen={isSectionOpen('appendix')}
        onToggle={toggleSection}
      >
        <ul className="space-y-3">
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <div>
              <h4 className="font-medium">Detailed Financials:</h4>
              <p className="text-sm">Full cost breakdown available on the "Financial Summary" tab.</p>
            </div>
          </li>
          
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <div>
              <h4 className="font-medium">Service Menu Glossary:</h4>
              <p className="text-sm">Key terms defined for clarity (Refer to separate Service Menu documentation if applicable).</p>
            </div>
          </li>
          
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <div>
              <h4 className="font-medium">Team Biographies:</h4>
              <p className="text-sm">Brief professional summaries for key personnel (Ashley C., Sofia R., assigned BT/Coach) available upon request.</p>
            </div>
          </li>
          
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <div>
              <h4 className="font-medium">Sample Tools:</h4>
              <p className="text-sm">Examples of data sheets, visual supports, or training outlines can be provided for review.</p>
            </div>
          </li>
        </ul>
      </AccordionItem>
    </div>
  );
};

export default ProposalAccordion;
