export interface ToolMeta {
  id: string;
  slug: string;
  name: string;
  cluster: 'flooring' | 'painting' | 'concrete-masonry' | 'garden' | 'rooms' | 'conversions';
  clusterName: string;
  clusterHref: string;
  benefit: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  formula: string;
  formulaDescription: string;
  methodology: string[];
  limitations: string[];
  workedExample: {
    title: string;
    scenario: string;
    inputs: { label: string; value: string }[];
    steps: { step: string; calculation: string; result: string }[];
    finalAnswer: string;
    proTip: string;
  };
  decisionSupport: {
    title: string;
    description: string;
    headers: string[];
    rows: (string | number)[][];
    notes: string[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedToolSlugs: string[];
  status: 'live' | 'coming-soon';
}
