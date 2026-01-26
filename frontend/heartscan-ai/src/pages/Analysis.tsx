import { Header } from "@/components/Header";
import { NeuralBackground } from "@/components/NeuralBackground";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
    LineChart,
    Line,
    PieChart,
    Pie,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Target, Zap, Brain, Shield, Layers, Users, TreeDeciduous, Repeat, Database, Fingerprint, PieChart as PieIcon } from "lucide-react";

const datasetDemographics = [
    { name: 'Male', value: 34500, fill: '#3b82f6' },
    { name: 'Female', value: 35500, fill: '#ec4899' }
];

const globalFeatureImpact = [
    { subject: 'Sys BP', A: 95, fullMark: 150 },
    { subject: 'Cholesterol', A: 85, fullMark: 150 },
    { subject: 'Age', A: 75, fullMark: 150 },
    { subject: 'Weight', A: 60, fullMark: 150 },
    { subject: 'Glucose', A: 50, fullMark: 150 },
    { subject: 'Lifestyle', A: 45, fullMark: 150 },
];

const modelData = [
    {
        name: "Logistic Regression",
        accuracy: 0.68,
        fullAccuracy: 0.68268,
        metrics: [
            { class: "Class 0", precision: 0.68, recall: 0.71, f1: 0.69 },
            { class: "Class 1", precision: 0.69, recall: 0.66, f1: 0.67 }
        ],
        params: { "Method": "Default Logistic Regression" },
        icon: <Activity className="w-5 h-5" />,
        color: "#3b82f6"
    },
    {
        name: "Boosting",
        accuracy: 0.73,
        fullAccuracy: 0.73,
        metrics: [
            { class: "Class 0", precision: 0.71, recall: 0.80, f1: 0.75 },
            { class: "Class 1", precision: 0.76, recall: 0.66, f1: 0.70 }
        ],
        params: { "learning_rate": 1, "n_estimators": 50 },
        icon: <Zap className="w-5 h-5" />,
        color: "#10b981"
    },
    {
        name: "Linear SVM",
        accuracy: 0.73,
        fullAccuracy: 0.73,
        metrics: [
            { class: "Class 0", precision: 0.70, recall: 0.79, f1: 0.75 },
            { class: "Class 1", precision: 0.76, recall: 0.66, f1: 0.70 }
        ],
        params: { "svm__C": 0.1 },
        icon: <Shield className="w-5 h-5" />,
        color: "#8b5cf6"
    },
    {
        name: "Bagging",
        accuracy: 0.71,
        fullAccuracy: 0.71,
        metrics: [
            { class: "Class 0", precision: 0.71, recall: 0.74, f1: 0.72 },
            { class: "Class 1", precision: 0.72, recall: 0.69, f1: 0.70 }
        ],
        params: { "max_features": 0.7, "max_samples": 0.7, "n_estimators": 200 },
        icon: <Layers className="w-5 h-5" />,
        color: "#f59e0b"
    },
    {
        name: "Decision Tree",
        accuracy: 0.72,
        fullAccuracy: 0.72,
        metrics: [
            { class: "Class 0", precision: 0.72, recall: 0.76, f1: 0.74 },
            { class: "Class 1", precision: 0.73, recall: 0.69, f1: 0.71 }
        ],
        params: { "criterion": "entropy", "max_depth": 10, "min_samples_leaf": 1, "min_samples_split": 2 },
        icon: <Brain className="w-5 h-5" />,
        color: "#ec4899"
    },
    {
        name: "KNN",
        accuracy: 0.682,
        fullAccuracy: 0.6826,
        metrics: [
            { class: "Class 0", precision: 0.68, recall: 0.71, f1: 0.69 },
            { class: "Class 1", precision: 0.69, recall: 0.66, f1: 0.67 }
        ],
        params: { "Method": "K-Nearest Neighbors" },
        icon: <Users className="w-5 h-5" />,
        color: "#6366f1"
    },
    {
        name: "Random Forest",
        accuracy: 0.731,
        fullAccuracy: 0.7312,
        metrics: [
            { class: "Class 0", precision: 0.68, recall: 0.71, f1: 0.69 },
            { class: "Class 1", precision: 0.69, recall: 0.66, f1: 0.67 }
        ],
        params: { "Method": "Random Forest Classifier" },
        icon: <TreeDeciduous className="w-5 h-5" />,
        color: "#22c55e"
    },
    {
        name: "K-Fold",
        accuracy: 0.685,
        fullAccuracy: 0.6851,
        metrics: [
            { class: "Class 0", precision: 0.68, recall: 0.71, f1: 0.69 },
            { class: "Class 1", precision: 0.69, recall: 0.66, f1: 0.67 }
        ],
        params: { "Method": "5-Fold Cross Validation" },
        folds: [
            { fold: "Fold 1", accuracy: 0.6786 },
            { fold: "Fold 2", accuracy: 0.6925 },
            { fold: "Fold 3", accuracy: 0.6819 },
            { fold: "Fold 4", accuracy: 0.6881 },
            { fold: "Fold 5", accuracy: 0.6842 }
        ],
        icon: <Repeat className="w-5 h-5" />,
        color: "#a855f7"
    }
];

export default function Analysis() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <NeuralBackground />
            <div className="fixed inset-0 bg-hero-gradient pointer-events-none z-0" />
            <Header />

            <main className="relative z-10 pt-32 px-4 pb-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-white font-display text-4xl md:text-6xl font-bold mb-6 text-foreground">
                            Model <span className="gradient-text">Analysis</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Performance comparison and deep insights into the unique cardiovascular dataset and predictive models.
                        </p>
                    </div>

                    {/* Dataset Uniqueness Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <Card className="glass-card border-none text-foreground">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Database className="w-4 h-4 text-primary" />
                                    Total Unique Records
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">70,000+</div>
                                <p className="text-xs text-muted-foreground mt-1">Anonymized medical examinations</p>
                            </CardContent>
                        </Card>
                        <Card className="glass-card border-none text-foreground">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Fingerprint className="w-4 h-4 text-cyan-400" />
                                    Unique Features
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">12</div>
                                <p className="text-xs text-muted-foreground mt-1">Principle clinical indicators</p>
                            </CardContent>
                        </Card>
                        <Card className="glass-card border-none text-foreground">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-emerald-400" />
                                    Data Points
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">840K</div>
                                <p className="text-xs text-muted-foreground mt-1">Processed health signals</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Demographics Graph */}
                        <Card className="glass-card border-none text-foreground">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <PieIcon className="w-5 h-5 text-primary" />
                                    Unique Demographics
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Gender distribution across the total study population
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px] flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={datasetDemographics}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {datasetDemographics.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '12px',
                                                color: 'hsl(var(--foreground))'
                                            }}
                                            itemStyle={{ color: 'hsl(var(--foreground))' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Feature Impact Graph */}
                        <Card className="glass-card border-none text-foreground">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <Target className="w-5 h-5 text-cyan-400" />
                                    Feature Uniqueness Impact
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Relative importance of health signals for disease prediction
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={globalFeatureImpact}>
                                        <PolarGrid stroke="#334155" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                        <Radar
                                            name="Impact Score"
                                            dataKey="A"
                                            stroke="#3b82f6"
                                            fill="#3b82f6"
                                            fillOpacity={0.6}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '12px',
                                                color: 'hsl(var(--foreground))'
                                            }}
                                            itemStyle={{ color: 'hsl(var(--foreground))' }}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 gap-8 mb-12">
                        {/* Accuracy Comparison Card */}
                        <Card className="glass-card border-none text-foreground">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <Repeat className="w-5 h-5 text-amber-400" />
                                    Model Benchmarking
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Comparison of overall accuracy across different machine learning architectures
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={modelData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#94a3b8"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#94a3b8"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            domain={[0.6, 0.75]}
                                            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '12px',
                                                color: 'hsl(var(--foreground))'
                                            }}
                                            itemStyle={{ color: 'hsl(var(--foreground))' }}
                                            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                        />
                                        <Bar dataKey="accuracy" radius={[8, 8, 0, 0]}>
                                            {modelData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="Boosting" className="space-y-8">
                        <div className="flex justify-center">
                            <TabsList className="bg-muted border border-border p-1 rounded-xl h-auto flex-wrap justify-center">
                                {modelData.map((model) => (
                                    <TabsTrigger
                                        key={model.name}
                                        value={model.name}
                                        className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                                    >
                                        {model.icon}
                                        <span className="hidden sm:inline">{model.name}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {modelData.map((model) => (
                            <TabsContent key={model.name} value={model.name} className="animate-in fade-in duration-500">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Detailed Metrics Card */}
                                    <Card className="glass-card border-none text-foreground lg:col-span-2">
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    {model.icon}
                                                    {model.name} Performance
                                                </div>
                                                <Badge variant="outline" className="text-primary border-primary/30">
                                                    Accuracy: {(model.accuracy * 100).toFixed(1)}%
                                                </Badge>
                                            </CardTitle>
                                            <CardDescription className="text-slate-400">
                                                Class-wise Precision, Recall, and F1-Score
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="h-[350px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                {model.folds ? (
                                                    <LineChart
                                                        data={model.folds}
                                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                                        <XAxis
                                                            dataKey="fold"
                                                            stroke="#94a3b8"
                                                            tickLine={false}
                                                            axisLine={false}
                                                        />
                                                        <YAxis
                                                            stroke="#94a3b8"
                                                            tickLine={false}
                                                            axisLine={false}
                                                            domain={['auto', 'auto']}
                                                            tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
                                                        />
                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor: 'hsl(var(--card))',
                                                                border: '1px solid hsl(var(--border))',
                                                                borderRadius: '12px',
                                                                color: 'hsl(var(--foreground))'
                                                            }}
                                                            itemStyle={{ color: 'hsl(var(--foreground))' }}
                                                        />
                                                        <Legend />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="accuracy"
                                                            stroke="#a855f7"
                                                            strokeWidth={3}
                                                            dot={{ r: 6, fill: "#a855f7", strokeWidth: 2, stroke: "#fff" }}
                                                            activeDot={{ r: 8 }}
                                                            name="Fold Accuracy"
                                                        />
                                                    </LineChart>
                                                ) : (
                                                    <BarChart
                                                        data={model.metrics}
                                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                                        <XAxis
                                                            dataKey="class"
                                                            stroke="#94a3b8"
                                                            tickLine={false}
                                                            axisLine={false}
                                                        />
                                                        <YAxis
                                                            stroke="#94a3b8"
                                                            tickLine={false}
                                                            axisLine={false}
                                                            domain={[0, 1]}
                                                        />
                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor: 'hsl(var(--card))',
                                                                border: '1px solid hsl(var(--border))',
                                                                borderRadius: '12px',
                                                                color: 'hsl(var(--foreground))'
                                                            }}
                                                            itemStyle={{ color: 'hsl(var(--foreground))' }}
                                                        />
                                                        <Legend iconType="circle" />
                                                        <Bar dataKey="precision" fill="#3b82f6" name="Precision" radius={[4, 4, 0, 0]} />
                                                        <Bar dataKey="recall" fill="#10b981" name="Recall" radius={[4, 4, 0, 0]} />
                                                        <Bar dataKey="f1" fill="#8b5cf6" name="F1-Score" radius={[4, 4, 0, 0]} />
                                                    </BarChart>
                                                )}
                                            </ResponsiveContainer>
                                        </CardContent>
                                    </Card>

                                    {/* Hyperparameters Card */}
                                    <Card className="glass-card border-none text-foreground">
                                        <CardHeader>
                                            <CardTitle className="text-lg">Configuration</CardTitle>
                                            <CardDescription className="text-slate-400">
                                                Best parameters for this model
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {Object.entries(model.params).map(([key, value]) => (
                                                    <div key={key} className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 border border-white/10">
                                                        <span className="text-xs text-slate-400 uppercase tracking-wider">{key.replace('__', ' ')}</span>
                                                        <span className="text-sm font-mono text-primary font-bold">{String(value)}</span>
                                                    </div>
                                                ))}
                                                <div className="pt-4 mt-4 border-t border-white/10">
                                                    <p className="text-xs text-slate-500 italic">
                                                        These results were obtained after extensive hyperparameter tuning using grid search cross-validation on the training set.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
