
import { PredictionResultData } from './ResultsDashboard';
import { Activity, AlertTriangle, CheckCircle, Calendar, FileText, User } from 'lucide-react';

interface ReportTemplateProps {
    result: PredictionResultData;
}

export const ReportTemplate = ({ result }: ReportTemplateProps) => {
    // Helper to format importance
    const getImportanceLabel = (val: number) => {
        if (val > 0.8) return 'Critical';
        if (val > 0.5) return 'High';
        if (val > 0.2) return 'Moderate';
        return 'Low';
    };

    return (
        <div className="p-12 bg-white text-slate-900 min-h-[1123px] w-[794px] mx-auto" id="report-template">
            {/* Professional Header */}
            <div className="flex justify-between items-center border-b-2 border-slate-900 pb-6 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Activity className="w-8 h-8 text-slate-900" />
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">CardioAI</h1>
                        <span className="px-2 py-1 bg-slate-100 text-xs font-semibold uppercase tracking-wider rounded border border-slate-200">Medical Report</span>
                    </div>
                    <p className="text-slate-500 text-sm">Advanced Cardiovascular Risk Assessment Analysis</p>
                </div>
                <div className="text-right space-y-1">
                    <div className="flex items-center justify-end gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2 text-sm text-slate-600">
                        <FileText className="w-4 h-4" />
                        <span>Ref: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                    </div>
                </div>
            </div>

            {/* Patient / Assessment Info Block */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
                <div className="flex items-center gap-2 mb-4 text-slate-900 font-semibold border-b border-slate-200 pb-2">
                    <User className="w-4 h-4" />
                    <span>Assessment Summary</span>
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-500">Analysis Type</span>
                        <span className="font-medium text-slate-900">Random Forest Classifier</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Model Confidence</span>
                        <span className="font-medium text-slate-900">{result.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Factors Analyzed</span>
                        <span className="font-medium text-slate-900">{result.factors.length} Clinical Indicators</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Assessment Status</span>
                        <span className="font-medium text-emerald-700 bg-emerald-50 px-2 rounded">Complete</span>
                    </div>
                </div>
            </div>

            {/* Primary Risk Result */}
            <div className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-slate-900 pl-3">Risk Assessment Result</h2>

                <div className="flex items-center gap-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    {/* Visual Indicator */}
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle className="text-slate-100 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent"></circle>
                            <circle
                                className={`${result.riskScore > 45 ? 'text-rose-600' : result.riskScore > 15 ? 'text-amber-500' : 'text-emerald-500'
                                    } progress-ring stroke-current transition-all duration-1000 ease-out`}
                                strokeWidth="10"
                                strokeLinecap="round"
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                strokeDasharray={`${result.riskScore * 2.51}, 251.2`}
                                transform="rotate(-90 50 50)"
                            ></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-bold text-slate-900 leading-none">{result.riskScore}%</span>
                        </div>
                    </div>

                    {/* Textual Result */}
                    <div className="flex-1">
                        <div className="mb-2">
                            <span className={`text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full ${result.riskScore > 45
                                ? 'bg-rose-100 text-rose-800'
                                : result.riskScore > 15
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                {result.riskScore > 45 ? 'High Risk' : result.riskScore > 15 ? 'Moderate Risk' : 'Low Risk'}
                            </span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            {result.riskScore > 45
                                ? "The analysis indicates a heavily elevated probability of cardiovascular issues. Immediate consultation with a healthcare professional is strongly recommended to verify these findings and discuss potential interventions."
                                : result.riskScore > 15
                                    ? "The analysis indicates a moderate risk profile. While not critical, proactive lifestyle adjustments and regular monitoring are advisable to prevent progression to higher risk categories."
                                    : "The analysis indicates a low probability of cardiovascular issues based on provided data. Maintaining a healthy lifestyle is recommended to preserve this status."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Clinical Factors Table */}
            <div className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-slate-900 pl-3">Clinical Indicators Analysis</h2>
                <div className="overflow-hidden rounded-lg border border-slate-200">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3">Factor Name</th>
                                <th className="px-6 py-3">Recorded Value</th>
                                <th className="px-6 py-3">Population Avg</th>
                                <th className="px-6 py-3">Impact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {result.factors.map((factor, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                                    <td className="px-6 py-3 font-medium text-slate-900">{factor.name}</td>
                                    <td className="px-6 py-3 text-slate-600">{factor.userValue}</td>
                                    <td className="px-6 py-3 text-slate-500">{factor.avgValue}</td>
                                    <td className="px-6 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${factor.impact === 'negative' ? 'bg-rose-500' : 'bg-emerald-500'
                                                }`} />
                                            <span className={factor.impact === 'negative' ? 'text-rose-700 font-medium' : 'text-emerald-700'}>
                                                {factor.impact === 'negative' ? 'Risk Factor' : 'Protective'}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* AI Insights */}
            <div className="mb-12">
                <h2 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-slate-900 pl-3">Actionable Insights</h2>
                <div className="grid grid-cols-1 gap-4">
                    {result.insights.map((insight, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-4 p-4 rounded-lg border ${insight.type === 'warning'
                                ? 'bg-amber-50 border-amber-200'
                                : insight.type === 'success'
                                    ? 'bg-emerald-50 border-emerald-200'
                                    : 'bg-blue-50 border-blue-200'
                                }`}
                        >
                            <div className={`mt-0.5 p-1 rounded-full ${insight.type === 'warning'
                                ? 'bg-amber-100 text-amber-600'
                                : insight.type === 'success'
                                    ? 'bg-emerald-100 text-emerald-600'
                                    : 'bg-blue-100 text-blue-600'
                                }`}>
                                {insight.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                                {insight.type === 'success' && <CheckCircle className="w-4 h-4" />}
                                {insight.type === 'info' && <Activity className="w-4 h-4" />}
                            </div>
                            <div>
                                <h4 className={`text-sm font-bold mb-1 ${insight.type === 'warning'
                                    ? 'text-amber-900'
                                    : insight.type === 'success'
                                        ? 'text-emerald-900'
                                        : 'text-blue-900'
                                    }`}>
                                    {insight.type === 'warning' ? 'Attention Required' : insight.type === 'success' ? 'Positive Indicator' : 'Health Note'}
                                </h4>
                                <p className="text-sm text-slate-700">{insight.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer / Disclaimer */}
            <div className="mt-auto pt-8 border-t border-slate-200">
                <div className="text-center space-y-2">
                    <p className="text-xs text-slate-900 font-semibold">CardioAI Medical Analysis System</p>
                    <p className="text-[10px] text-slate-500 max-w-lg mx-auto leading-relaxed">
                        DISCLAIMER: This report is generated by an artificial intelligence model and is intended for informational and educational purposes only.
                        It utilizes statistical analysis of historical health data to estimate probabilities.
                        This report does NOT constitute a medical diagnosis, prognosis, or treatment plan.
                        Always consult with a qualified healthcare provider for interpretation of these results and before making any medical decisions.
                    </p>
                    <p className="text-[10px] text-slate-400">
                        Page 1 of 1 • Generated via CardioAI v1.2
                    </p>
                </div>
            </div>
        </div>
    );
};
