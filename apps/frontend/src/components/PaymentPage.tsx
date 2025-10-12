import { useState } from "react";
import {
  CreditCard,
  Shield,
  ArrowLeft,
  Check,
  Lock,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PaymentPageProps {
  onPageChange: (page: string) => void;
}

export function PaymentPage({ onPageChange }: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "paypal" | "bank"
  >("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const trackData = {
    title: "Midnight Dreams",
    artist: "Luna Valley",
    shares: 10,
    pricePerShare: 12.5,
    total: 125.0,
    platformFee: 3.75,
    finalTotal: 128.75,
    cover:
      "https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2ODgwNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to success or portfolio page
      onPageChange("portfolio");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange("browse")}
            className="mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Complete Your Investment</h1>
            <p className="text-muted-foreground text-lg">
              Secure payment powered by Stripe
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div className="space-y-3">
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Card
                      className={`cursor-pointer border-2 ${
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <CardContent className="p-3 text-center">
                        <CreditCard className="w-6 h-6 mx-auto mb-1" />
                        <div className="text-sm font-medium">Card</div>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer border-2 ${
                        paymentMethod === "paypal"
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                      onClick={() => setPaymentMethod("paypal")}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="w-6 h-6 mx-auto mb-1 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                          PP
                        </div>
                        <div className="text-sm font-medium">PayPal</div>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer border-2 ${
                        paymentMethod === "bank"
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                      onClick={() => setPaymentMethod("bank")}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="w-6 h-6 mx-auto mb-1 bg-gray-600 rounded text-white text-xs flex items-center justify-center">
                          B
                        </div>
                        <div className="text-sm font-medium">Bank</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        defaultValue="user@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="1234 1234 1234 1234"
                          className="pr-12"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                          <div className="w-6 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                            V
                          </div>
                          <div className="w-6 h-4 bg-red-600 rounded text-white text-xs flex items-center justify-center">
                            M
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" className="pr-8" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Cardholder Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <div className="text-white font-bold text-xl">PP</div>
                    </div>
                    <h3 className="font-semibold mb-2">Pay with PayPal</h3>
                    <p className="text-muted-foreground mb-6">
                      You'll be redirected to PayPal to complete your payment
                      securely.
                    </p>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={handlePayment}
                    >
                      Continue to PayPal
                    </Button>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <CreditCard className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Bank Transfer</h3>
                    <p className="text-muted-foreground mb-6">
                      Connect your bank account for direct transfer. This may
                      take 2-3 business days.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handlePayment}
                    >
                      Connect Bank Account
                    </Button>
                  </div>
                )}

                {/* Security Notice */}
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Your payment information is encrypted and secure. We use
                    industry-standard SSL encryption.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Terms */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Investment Notice</p>
                    <p className="text-muted-foreground">
                      Music investments carry risk. Track performance may vary
                      and past success doesn't guarantee future returns. Only
                      invest what you can afford to lose.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Investment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Track Info */}
                <div className="flex items-center space-x-3">
                  <ImageWithFallback
                    src={trackData.cover}
                    alt={trackData.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{trackData.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {trackData.artist}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Shares ({trackData.shares})</span>
                    <span className="text-sm">
                      ${trackData.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Price per share</span>
                    <span className="text-sm">${trackData.pricePerShare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Platform fee (3%)</span>
                    <span className="text-sm">
                      ${trackData.platformFee.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${trackData.finalTotal.toFixed(2)}</span>
                </div>

                {paymentMethod === "card" && (
                  <Button
                    className="w-full mt-6 text-lg py-6"
                    style={{ background: "var(--gradient-primary)" }}
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing Investment...
                      </div>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Complete Investment
                      </>
                    )}
                  </Button>
                )}

                {/* Security badges */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      SSL Secured
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-1" />
                      Stripe Protected
                    </div>
                  </div>
                </div>

                {/* Investment breakdown */}
                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-medium text-sm">What you get:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>
                      • {trackData.shares} shares in "{trackData.title}"
                    </li>
                    <li>• Voting rights on track decisions</li>
                    <li>• Revenue sharing from streams & sales</li>
                    <li>• Access to exclusive content</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
