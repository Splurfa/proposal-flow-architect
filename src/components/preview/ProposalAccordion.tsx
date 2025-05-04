
import React, { useState } from 'react';
import { useProposal } from '../../context/ProposalContext';
import { formatCurrency } from '../../utils/formatters';

// Section type for proposal sections
interface AccordionSection {
  id: string;
  title: string;
  content: React.ReactNode;
  isOpen?: boolean;
}

const ProposalAccordion: React.FC = () => {
  const { state, financialSummary } = useProposal();
  const { activeView, clients, globalSettings } = state;
  
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    'section-1': true // First section open by default
  });
  
  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  // Get active client data
  const activeClient = clients.find(client => client.clientName === activeView);
  
  if (!activeClient) {
    return <div>No client data available</div>;
  }
  
  // Calculate monthly and yearly investment ranges
  const weeklyMin = activeClient.roles.reduce((sum, role) => sum + (role.billingRate * role.minHours), 0);
  const weeklyMax = activeClient.roles.reduce((sum, role) => sum + (role.billingRate * role.maxHours), 0);
  
  const weeksPerMonth = 4.33; // Standard approximation
  const monthlyMin = weeklyMin * weeksPerMonth;
  const monthlyMax = weeklyMax * weeksPerMonth;
  
  const yearlyWeeks = globalSettings.weeksInProposalPeriod;
  const yearlyMin = weeklyMin * yearlyWeeks;
  const yearlyMax = weeklyMax * yearlyWeeks;
  
  // Generate team list based on roles with hours
  const teamList = activeClient.roles
    .filter(role => role.maxHours > 0) // Only show roles that are being used
    .map(role => {
      const roleDescriptions: { [key: string]: string } = {
        'Clinical Director': 'Provides senior clinical oversight and strategic direction',
        'Senior BCBA/ECD': 'Leads assessment, program development, and clinical implementation',
        'Behavior Technician': 'Delivers direct support and implements behavior plans',
        'Social Skills Coach': 'Facilitates social learning and group interventions'
      };
      
      return {
        role: role.role,
        rate: role.billingRate,
        description: roleDescriptions[role.role] || 'Team member'
      };
    });

  // Generate hours summary list for the proposal
  const hoursItems = activeClient.roles
    .filter(role => role.maxHours > 0)
    .map(role => {
      return {
        role: role.role,
        range: role.minHours === role.maxHours 
          ? `${role.minHours} hours/week` 
          : `${role.minHours}-${role.maxHours} hours/week`
      };
    });

  // Proposal sections with content
  const sections: AccordionSection[] = [
    {
      id: 'section-1',
      title: 'Continuing Our Partnership',
      content: (
        <div className="prose prose-sm max-w-none">
          <p>
            We sincerely value our partnership with <span className="data-placeholder">{activeClient.clientName}</span> and appreciate the opportunity to continue supporting your students and staff.
          </p>
          <p>
            Building on last year's successes, such as the positive impact observed in K-2/ECE support and staff feedback, we propose a refined service model for the upcoming school year.
          </p>
          <p>
            Stellar Steps' growth, including enhanced operations, allows us to offer even more effective and efficient support, reflecting our commitment to continuous improvement for our partners.
          </p>
        </div>
      )
    },
    {
      id: 'section-2',
      title: `Understanding ${activeClient.clientName}'s Goals`,
      content: (
        <div className="prose prose-sm max-w-none">
          <p>
            Our collaboration highlights key focus areas like supporting diverse learners, building foundational skills (especially in early grades), enhancing classroom management, and optimizing support staff utilization.
          </p>
          <p>
            We understand your current priority is to maintain consistent, high-quality behavioral supports while exploring potential future needs (like middle school expansion or ECE focus).
          </p>
          <p>
            Success this year means achieving tangible outcomes, such as reduced classroom disruptions, improved staff confidence, and enhanced student self-regulation and participation.
          </p>
        </div>
      )
    },
    {
      id: 'section-3',
      title: 'Our Approach: Tiered Support Framework',
      content: (
        <div className="prose prose-sm max-w-none">
          <p>
            We utilize an evidence-based Tiered Model (MTSS) for efficient, needs-matched support. Our approach focuses on proactive strategies and building capacity within your school community.
          </p>
          <ul className="space-y-3 mt-4">
            <li className="tier-1 bg-blue-50 p-3 rounded-lg border border-blue-100">
              <strong><i className="fas fa-layer-group mr-2"></i>Tier 1 (Universal)</strong>
              <p className="mt-1">Foundational strategies for all students & staff (e.g., Staff PD on proactive management, Systems Consultation for routines/reinforcement).</p>
            </li>
            <li className="tier-2 bg-green-50 p-3 rounded-lg border border-green-100">
              <strong><i className="fas fa-bullseye mr-2"></i>Tier 2 (Targeted)</strong>
              <p className="mt-1">Early intervention for some students (e.g., Social Skills Groups, Focused Teacher/TA Coaching, Data Support).</p>
            </li>
            <li className="tier-3 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
              <strong><i className="fas fa-user-pen mr-2"></i>Tier 3 (Intensive)</strong>
              <p className="mt-1">Individualized support for few students (e.g., BIP Development post-FBA, 1:1 Intervention, Implementation Training).</p>
            </li>
            <li className="tier-cross bg-purple-50 p-3 rounded-lg border border-purple-100">
              <strong><i className="fas fa-arrows-up-down-left-right mr-2"></i>Cross-Tier</strong>
              <p className="mt-1">Essential functions supporting all tiers (e.g., Ongoing BCBA Consultation, FBA as needed, Parent Training, Supervision).</p>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'section-4',
      title: 'Your Stellar Steps Team',
      content: (
        <div className="prose prose-sm max-w-none">
          <p>
            We provide a dedicated, multi-disciplinary team, balancing experienced direct support with senior clinical oversight.
          </p>
          <ul className="team-list mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamList.map((item, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="font-medium">{item.role}</div>
                <div className="text-sm text-blue-600">${item.rate}/hr</div>
                <p className="text-sm mt-2 text-gray-600">{item.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            Clinical oversight and operational support ensure high-quality, consistent service delivery throughout our partnership.
          </p>
        </div>
      )
    },
    {
      id: 'section-5',
      title: 'Partnership Investment',
      content: (
        <div className="prose prose-sm max-w-none">
          <p>
            Our flexible model allows tailoring service hours to <span className="data-placeholder">{activeClient.clientName}</span>'s needs. Based on our discussion, we propose the following estimated weekly allocation:
          </p>
          <ul className="list-none pl-0 mb-6 space-y-1 mt-3">
            {hoursItems.map((item, index) => (
              <li key={index} className="bg-gray-50 p-2 rounded flex justify-between">
                <span className="font-medium">{item.role}:</span> 
                <span>{item.range}</span>
              </li>
            ))}
          </ul>
          <div className="investment-summary-box bg-blue-50 border border-blue-100 rounded-lg p-6 mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-gray-700">Estimated Monthly Range</h5>
              <p className="text-xl font-bold mt-2 text-blue-700">
                {formatCurrency(monthlyMin)} - {formatCurrency(monthlyMax)}
              </p>
              <p className="text-xs text-gray-500 mt-1">(Approx. {weeksPerMonth.toFixed(2)} weeks/month)</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700">Estimated Yearly Range</h5>
              <p className="text-xl font-bold mt-2 text-blue-700">
                {formatCurrency(yearlyMin)} - {formatCurrency(yearlyMax)}
              </p>
              <p className="text-xs text-gray-500 mt-1">(Based on {yearlyWeeks} weeks)</p>
            </div>
          </div>
          <p className="mt-4">
            This investment reflects the comprehensive support, clinical expertise, and operational efficiency provided. We are committed to working with you to finalize a package that meets your needs effectively and transparently.
          </p>
        </div>
      )
    },
    {
      id: 'section-6',
      title: 'Expected Outcomes & Impact',
      content: (
        <div className="prose prose-sm max-w-none">
          <p>
            This partnership aims for tangible benefits, enhancing the experience for students, staff, and families:
          </p>
          <ul className="space-y-2 mt-3">
            <li><strong>Student Growth:</strong> Improved social-emotional skills, participation, and readiness for learning.</li>
            <li><strong>Staff Empowerment:</strong> Increased capacity, confidence, and consistency in implementing effective behavioral strategies.</li>
            <li><strong>Positive Climate:</strong> Reduced behavioral challenges contributing to more available instructional time and positive peer interactions.</li>
            <li><strong>Resource Optimization:</strong> Efficient use of school resources through a structured, preventative support model.</li>
          </ul>
          <p className="mt-3">
            Our collaborative and integrated approach helps achieve these meaningful results.
          </p>
        </div>
      )
    },
    {
      id: 'section-7',
      title: 'Next Steps',
      content: (
        <div className="prose prose-sm max-w-none">
          <p>
            We look forward to discussing this proposal with <span className="data-placeholder">{activeClient.clientName}</span> leadership to refine the plan and finalize the scope for the upcoming school year.
          </p>
          <p className="font-medium">
            <strong>Proposed next step:</strong> Schedule a meeting within the next 1-2 weeks to review details and answer questions.
          </p>
          <p>
            To ensure seamless planning, we request confirmation of intent by [Date].
          </p>
          <p className="text-xs text-gray-500 mt-6 italic">
            This proposal contains proprietary information belonging to Stellar Steps LLC. It is intended solely for the recipient and may not be disclosed or reproduced without prior written permission.
          </p>
        </div>
      )
    },
    {
      id: 'section-8',
      title: 'Appendix',
      content: (
        <div className="prose prose-sm max-w-none">
          <ul className="space-y-2">
            <li><strong>Detailed Financials:</strong> Full cost breakdown available on the "Financial Summary" tab.</li>
            <li><strong>Service Menu Glossary:</strong> Key terms defined for clarity [Refer to separate Service Menu document/tab if applicable].</li>
            <li><strong>Team Biographies:</strong> Brief professional summaries for key personnel (Ashley C., Sofia R., assigned BT/Coach) available upon request.</li>
            <li><strong>Sample Tools:</strong> Examples of data sheets, visual supports, or training outlines can be provided for review.</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="accordion-container space-y-4">
      {sections.map((section) => (
        <div key={section.id} className="accordion-item border border-gray-200 rounded-lg overflow-hidden">
          <div 
            className={`accordion-header flex items-center justify-between p-4 cursor-pointer ${openSections[section.id] ? 'bg-indigo-50' : 'bg-white'}`}
            onClick={() => toggleSection(section.id)}
          >
            <h3 className="font-medium text-gray-800 flex items-center">
              <span>{section.title}</span>
            </h3>
            <span className="text-gray-500">
              <i className={`fas fa-chevron-${openSections[section.id] ? 'up' : 'down'}`}></i>
            </span>
          </div>
          
          {openSections[section.id] && (
            <div className="accordion-content p-4 bg-white border-t border-gray-200">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProposalAccordion;
