import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, User, Heart, Activity, Pill, Check } from 'lucide-react';

export interface HealthData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  systolicBP: string;
  diastolicBP: string;
  cholesterol: string;
  glucose: string;
  smoking: string;
  alcohol: string;
  exercise: string;
}

interface HealthInputFormProps {
  onSubmit: (data: HealthData) => void;
  onBack: () => void;
}

const steps = [
  { id: 1, title: 'Basic Info', icon: User },
  { id: 2, title: 'Vitals', icon: Heart },
  { id: 3, title: 'Blood Work', icon: Activity },
  { id: 4, title: 'Lifestyle', icon: Pill },
];

export const HealthInputForm = ({ onSubmit, onBack }: HealthInputFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<HealthData>({
    age: '',
    gender: '',
    height: '',
    weight: '',
    systolicBP: '',
    diastolicBP: '',
    cholesterol: '',
    glucose: '',
    smoking: '',
    alcohol: '',
    exercise: '',
  });
  const [errors, setErrors] = useState<Partial<HealthData>>({});

  const updateField = (field: keyof HealthData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = () => {
    const newErrors: Partial<HealthData> = {};

    if (currentStep === 1) {
      if (!formData.age || parseInt(formData.age) < 1 || parseInt(formData.age) >= 120) {
        newErrors.age = 'Enter a valid age (1-119)';
      }
      if (!formData.gender) newErrors.gender = 'Select your gender';
      if (!formData.height || parseFloat(formData.height) < 50 || parseFloat(formData.height) >= 230) {
        newErrors.height = 'Enter valid height (<230 cm)';
      }
      if (!formData.weight || parseFloat(formData.weight) < 20 || parseFloat(formData.weight) >= 200) {
        newErrors.weight = 'Enter valid weight (<200 kg)';
      }
    } else if (currentStep === 2) {
      if (!formData.systolicBP || parseInt(formData.systolicBP) < 70 || parseInt(formData.systolicBP) > 250) {
        newErrors.systolicBP = 'Enter valid systolic BP (70-250)';
      }
      if (!formData.diastolicBP || parseInt(formData.diastolicBP) < 40 || parseInt(formData.diastolicBP) > 150) {
        newErrors.diastolicBP = 'Enter valid diastolic BP (40-150)';
      }
    } else if (currentStep === 3) {
      if (!formData.cholesterol) newErrors.cholesterol = 'Select cholesterol level';
      if (!formData.glucose) newErrors.glucose = 'Select glucose level';
    } else if (currentStep === 4) {
      if (!formData.smoking) newErrors.smoking = 'Select smoking status';
      if (!formData.alcohol) newErrors.alcohol = 'Select alcohol consumption';
      if (!formData.exercise) newErrors.exercise = 'Select physical activity level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < 4) {
        setCurrentStep(prev => prev + 1);
      } else {
        onSubmit(formData);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-foreground">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g., 45"
                  value={formData.age}
                  onChange={(e) => updateField('age', e.target.value)}
                  className={`glass-card border-white/10 ${errors.age ? 'border-destructive' : ''}`}
                />
                {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-foreground">Gender</Label>
                <Select value={formData.gender} onValueChange={(v) => updateField('gender', v)}>
                  <SelectTrigger className={`glass-card border-white/10 ${errors.gender ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-xs text-destructive">{errors.gender}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height" className="text-foreground">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 175"
                  value={formData.height}
                  onChange={(e) => updateField('height', e.target.value)}
                  className={`glass-card border-white/10 ${errors.height ? 'border-destructive' : ''}`}
                />
                {errors.height && <p className="text-xs text-destructive">{errors.height}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-foreground">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={formData.weight}
                  onChange={(e) => updateField('weight', e.target.value)}
                  className={`glass-card border-white/10 ${errors.weight ? 'border-destructive' : ''}`}
                />
                {errors.weight && <p className="text-xs text-destructive">{errors.weight}</p>}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-destructive" />
                <p className="text-sm text-muted-foreground">
                  Blood pressure is measured in mmHg. Normal is around 120/80.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="systolicBP" className="text-foreground">Systolic BP (upper)</Label>
                <Input
                  id="systolicBP"
                  type="number"
                  placeholder="e.g., 120"
                  value={formData.systolicBP}
                  onChange={(e) => updateField('systolicBP', e.target.value)}
                  className={`glass-card border-white/10 ${errors.systolicBP ? 'border-destructive' : ''}`}
                />
                {errors.systolicBP && <p className="text-xs text-destructive">{errors.systolicBP}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="diastolicBP" className="text-foreground">Diastolic BP (lower)</Label>
                <Input
                  id="diastolicBP"
                  type="number"
                  placeholder="e.g., 80"
                  value={formData.diastolicBP}
                  onChange={(e) => updateField('diastolicBP', e.target.value)}
                  className={`glass-card border-white/10 ${errors.diastolicBP ? 'border-destructive' : ''}`}
                />
                {errors.diastolicBP && <p className="text-xs text-destructive">{errors.diastolicBP}</p>}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-foreground">Cholesterol Level</Label>
              <Select value={formData.cholesterol} onValueChange={(v) => updateField('cholesterol', v)}>
                <SelectTrigger className={`glass-card border-white/10 ${errors.cholesterol ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select cholesterol level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal (&lt;200 mg/dL)</SelectItem>
                  <SelectItem value="above_normal">Above Normal (200-239 mg/dL)</SelectItem>
                  <SelectItem value="high">High (≥240 mg/dL)</SelectItem>
                </SelectContent>
              </Select>
              {errors.cholesterol && <p className="text-xs text-destructive">{errors.cholesterol}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Glucose Level</Label>
              <Select value={formData.glucose} onValueChange={(v) => updateField('glucose', v)}>
                <SelectTrigger className={`glass-card border-white/10 ${errors.glucose ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select glucose level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal (&lt;100 mg/dL)</SelectItem>
                  <SelectItem value="above_normal">Above Normal (100-125 mg/dL)</SelectItem>
                  <SelectItem value="high">High (≥126 mg/dL)</SelectItem>
                </SelectContent>
              </Select>
              {errors.glucose && <p className="text-xs text-destructive">{errors.glucose}</p>}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-foreground">Smoking Status</Label>
              <Select value={formData.smoking} onValueChange={(v) => updateField('smoking', v)}>
                <SelectTrigger className={`glass-card border-white/10 ${errors.smoking ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select smoking status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never Smoked</SelectItem>
                  <SelectItem value="former">Former Smoker</SelectItem>
                  <SelectItem value="current">Current Smoker</SelectItem>
                </SelectContent>
              </Select>
              {errors.smoking && <p className="text-xs text-destructive">{errors.smoking}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Alcohol Consumption</Label>
              <Select value={formData.alcohol} onValueChange={(v) => updateField('alcohol', v)}>
                <SelectTrigger className={`glass-card border-white/10 ${errors.alcohol ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select alcohol consumption" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="heavy">Heavy</SelectItem>
                </SelectContent>
              </Select>
              {errors.alcohol && <p className="text-xs text-destructive">{errors.alcohol}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Physical Activity</Label>
              <Select value={formData.exercise} onValueChange={(v) => updateField('exercise', v)}>
                <SelectTrigger className={`glass-card border-white/10 ${errors.exercise ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light (1-2 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-4 days/week)</SelectItem>
                  <SelectItem value="active">Active (5+ days/week)</SelectItem>
                </SelectContent>
              </Select>
              {errors.exercise && <p className="text-xs text-destructive">{errors.exercise}</p>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl">
        {/* Progress Steps */}
        <div className="flex items-center w-full mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive
                      ? 'bg-primary text-primary-foreground shadow-glow'
                      : isCompleted
                        ? 'bg-success text-success-foreground'
                        : 'glass-card text-muted-foreground'
                      }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs mt-2 font-medium absolute top-full w-24 text-center left-1/2 -translate-x-1/2 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                    {step.title}
                  </span>
                </div>
                {!isLast && (
                  <div className={`h-0.5 mx-2 flex-1 transition-colors ${isCompleted ? 'bg-success' : 'bg-border'
                    }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="glass-card rounded-3xl p-8 animate-scale-in">
          <h2 className="font-display text-2xl font-bold mb-2">
            {steps[currentStep - 1].title}
          </h2>
          <p className="text-muted-foreground mb-8">
            {currentStep === 1 && "Let's start with some basic information about you."}
            {currentStep === 2 && "Enter your blood pressure measurements."}
            {currentStep === 3 && "Share your recent blood work results."}
            {currentStep === 4 && "Tell us about your lifestyle habits."}
          </p>

          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            <Button variant="glass" size="lg" onClick={handlePrev}>
              <ChevronLeft className="w-5 h-5" />
              {currentStep === 1 ? 'Back' : 'Previous'}
            </Button>
            <Button variant="hero" size="lg" onClick={handleNext}>
              {currentStep === 4 ? 'Analyze' : 'Next'}
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
